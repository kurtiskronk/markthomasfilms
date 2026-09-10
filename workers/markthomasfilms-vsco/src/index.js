/* =========================================================
	 MARK THOMAS FILMS → VSCO WORKSPACE

	 Production Cloudflare Worker
	 
	 =========================================================
	 SOURCE OF TRUTH: GITHUB
	 kurtiskronk/markthomasfilms
	 /workers/markthomasfilms-vsco/
	 
	 DO NOT EDIT THIS WORKER IN THE CLOUDFLARE DASHBOARD.
	 Make changes in Nova, then run:
	 markthomasfilms push
	 
	 Cloudflare Builds deploys this Worker automatically.
	 =========================================================
	 
	 Lead creation:
	 Legacy New Lead API
	 (preserves native VSCO New Lead notifications)

	 Post-processing:
	 V2 API
	 (renames job to WEDDING: FirstName LastName)
	 
	 // Deployed from GitHub kurtiskronk/markthomasfilms via Cloudflare Builds.
	 ========================================================= */



/* =========================================================
	 CONFIGURATION
	 ========================================================= */

const VSCO_LEGACY_BASE =
	'https://tave.app/webservice/create-lead';

const VSCO_V2_BASE =
	'https://workspace.vsco.co/api/v2';

const MTF_BRAND_ID =
	'204269';

const ALLOWED_ORIGINS = [
	'https://markthomasfilms.com',
	'https://www.markthomasfilms.com'
];


/* =========================================================
	 WORKER
	 ========================================================= */

export default {

	async fetch(request, env) {

		const url =
			new URL(request.url);

		const origin =
			request.headers.get('Origin');


		/* =====================================================
			 CORS PREFLIGHT
			 ===================================================== */

		if (
			request.method === 'OPTIONS'
		) {

			if (
				!origin ||
				!isAllowedOrigin(origin)
			) {

				return jsonResponse(
					{
						ok: false,
						message: 'Origin not allowed.'
					},
					403,
					origin
				);

			}


			return new Response(
				null,
				{
					status: 204,
					headers:
						corsHeaders(origin)
				}
			);

		}


		/* =====================================================
			 ROOT
			 ===================================================== */

		if (
			request.method === 'GET' &&
			url.pathname === '/'
		) {

			return new Response(
				'Mark Thomas Films VSCO integration is running.',
				{
					status: 200,
					headers: {
						'Content-Type':
							'text/plain; charset=UTF-8',

						'Cache-Control':
							'no-store'
					}
				}
			);

		}


		/* =====================================================
			 HEALTH
			 ===================================================== */

		if (
			request.method === 'GET' &&
			url.pathname === '/health'
		) {

			const legacyConfigured =
				Boolean(
					env.VSCO_LEGACY_SECRET_KEY &&
					env.VSCO_LEGACY_STUDIO_ALIAS
				);

			const renameConfigured =
				Boolean(
					env.VSCO_API_KEY
				);


			return jsonResponse(
				{
					ok:
						legacyConfigured &&
						renameConfigured,

					legacyLeadCreation:
						legacyConfigured,

					jobRenaming:
						renameConfigured,

					message:
						legacyConfigured &&
						renameConfigured
							? 'VSCO lead creation and job renaming are configured.'
							: 'One or more VSCO integrations are not configured.'
				},
				legacyConfigured &&
					renameConfigured
						? 200
						: 500
			);

		}


		/* =====================================================
			 CREATE INQUIRY
			 ===================================================== */

		if (
			request.method === 'POST' &&
			url.pathname === '/inquiry'
		) {

			/* -------------------------------------------------
				 REQUIRE MARK THOMAS FILMS ORIGIN
				 ------------------------------------------------- */

			if (
				!origin ||
				!isAllowedOrigin(origin)
			) {

				return jsonResponse(
					{
						ok: false,
						message:
							'Origin not allowed.'
					},
					403,
					origin
				);

			}


			/* -------------------------------------------------
				 VERIFY LEGACY API CONFIG
				 ------------------------------------------------- */

			if (
				!env.VSCO_LEGACY_SECRET_KEY ||
				!env.VSCO_LEGACY_STUDIO_ALIAS
			) {

				return jsonResponse(
					{
						ok: false,
						message:
							'VSCO lead integration is not configured.'
					},
					500,
					origin
				);

			}


			let data;


			try {

				data =
					await request.json();

			}

			catch (error) {

				return jsonResponse(
					{
						ok: false,
						message:
							'Invalid request body.'
					},
					400,
					origin
				);

			}


			/* =================================================
				 HONEYPOT
				 ================================================= */

			if (
				cleanString(
					data.website
				)
			) {

				return jsonResponse(
					{
						ok: true
					},
					200,
					origin
				);

			}


			/* =================================================
				 CORE CONTACT DATA
				 ================================================= */

			const firstName =
				truncate(
					cleanString(
						data.firstName
					),
					48
				);

			const lastName =
				truncate(
					cleanString(
						data.lastName
					),
					48
				);

			const email =
				truncate(
					cleanString(
						data.email
					),
					64
				);

			const weddingDate =
				cleanString(
					data.weddingDate
				);

			const phone =
				normalizePhone(
					data.phone
				);

			const eventLocation =
				truncate(
					cleanString(
						data.eventLocation
					),
					500
				);


			/* =================================================
				 REQUIRED DATA
				 ================================================= */

			if (
				!firstName ||
				!lastName ||
				!email ||
				!weddingDate ||
				!phone ||
				!eventLocation
			) {

				return jsonResponse(
					{
						ok: false,
						message:
							'Required inquiry information is missing.'
					},
					400,
					origin
				);

			}


			if (
				!isValidEmail(email)
			) {

				return jsonResponse(
					{
						ok: false,
						message:
							'Invalid email address.'
					},
					400,
					origin
				);

			}


			if (
				!isValidDate(
					weddingDate
				)
			) {

				return jsonResponse(
					{
						ok: false,
						message:
							'Invalid wedding date.'
					},
					400,
					origin
				);

			}


			/* =================================================
				 LEAD SOURCE
				 ================================================= */

			const leadSource =
				normalizeLeadSource(
					data.leadSource
				);


			/* =================================================
				 LEGACY NEW LEAD PAYLOAD
				 ================================================= */

			const payload = {

				SecretKey:
					env.VSCO_LEGACY_SECRET_KEY,

				Brand:
					MTF_BRAND_ID,

				Email:
					email,

				FirstName:
					firstName,

				LastName:
					lastName,

				MobilePhone:
					phone,

				Source:
					leadSource,

				JobType:
					'Wedding',

				JobRole:
					'Primary Contact',

				EventDate:
					weddingDate,

				'CF-892517':
					eventLocation

			};


			/* =================================================
				 REFERRAL NAME
				 ================================================= */

			const referralName =
				truncate(
					cleanString(
						data.referralName
					),
					500
				);


			if (
				referralName &&
				(
					leadSource ===
						'Wedding Professional' ||
					leadSource ===
						'Friend or Family'
				)
			) {

				payload['CF-892519'] =
					referralName;

			}


			/* =================================================
				 CLIENT MESSAGE
				 ================================================= */

			const message =
				truncate(
					cleanString(
						data.message
					),
					2000
				);


			if (message) {

				payload.Message =
					message;

			}


			/* =================================================
				 QUOTE BUILDER
				 ================================================= */

			const sqf =
				data.sqf &&
				typeof data.sqf === 'object'
					? data.sqf
					: {};


			const directQuoteSummary =
				cleanString(
					data.quoteSummary
				);


			const quoteSummary =
				directQuoteSummary ||
				buildQuoteSummary(
					sqf
				);


			if (quoteSummary) {

				payload['CF-892513'] =
					quoteSummary;

			}


			let quoteTotal =
				parseQuoteTotal(
					data.quoteTotal
				);


			if (
				quoteTotal === null
			) {

				quoteTotal =
					parseQuoteTotal(
						sqf.quote
					);

			}


			if (
				quoteTotal !== null
			) {

				payload['CF-892515'] =
					quoteTotal;

			}


			/* =================================================
				 CREATE LEAD THROUGH LEGACY API
				 ================================================= */

			try {

				const legacyUrl =
					VSCO_LEGACY_BASE +
					'/' +
					encodeURIComponent(
						env.VSCO_LEGACY_STUDIO_ALIAS
					);


				const response =
					await fetch(
						legacyUrl,
						{
							method:
								'POST',

							headers: {

								'Accept':
									'application/json',

								'Content-Type':
									'application/json'

							},

							body:
								JSON.stringify(
									payload
								)
						}
					);


				const rawBody =
					await response.text();


				let result =
					null;


				try {

					result =
						rawBody
							? JSON.parse(
								rawBody
							)
							: null;

				}

				catch (error) {

					result = null;

				}


				const success =
					response.ok &&
					result &&
					String(
						result.Status || ''
					).toLowerCase() ===
						'success';


				if (!success) {

					console.error(
						'VSCO Legacy New Lead API rejected inquiry.',
						{
							status:
								response.status,

							response:
								rawBody
						}
					);


					return jsonResponse(
						{
							ok: false,
							message:
								'VSCO Workspace did not accept the inquiry.'
						},
						502,
						origin
					);

				}


				/* =================================================
					 RENAME JOB

					 Legacy creates the lead so that VSCO sends its
					 native New Lead notification.

					 Then V2 renames the job to:

					 WEDDING: FirstName LastName
					 ================================================= */

				const legacyJobId =
					String(
						result.JobID || ''
					);


				const customJobName =
					'WEDDING: ' +
					firstName +
					' ' +
					lastName;


				let renamed =
					false;


				if (
					legacyJobId &&
					env.VSCO_API_KEY
				) {

					try {

						renamed =
							await renameCreatedJob(
								legacyJobId,
								customJobName,
								env
							);

					}

					catch (error) {

						console.error(
							'VSCO job rename failed.',
							error
						);

					}

				}


				/* =================================================
					 SUCCESS

					 A rename failure never invalidates the lead.
					 ================================================= */

				return jsonResponse(
					{
						ok: true,

						message:
							'Inquiry created successfully.',

						jobId:
							result.JobID || null,

						jobRenamed:
							renamed
					},
					201,
					origin
				);

			}

			catch (error) {

				console.error(
					'VSCO inquiry request failed.',
					error
				);


				return jsonResponse(
					{
						ok: false,
						message:
							'Unable to create VSCO inquiry.'
					},
					500,
					origin
				);

			}

		}


		/* =====================================================
			 NOT FOUND
			 ===================================================== */

		return jsonResponse(
			{
				ok: false,
				message:
					'Endpoint not found.'
			},
			404,
			origin
		);

	}

};


/* =========================================================
	 V2 JOB RENAME
	 ========================================================= */

async function renameCreatedJob(
	legacyJobId,
	jobName,
	env
) {

	const delays = [
		250,
		750,
		1500,
		2500
	];


	for (
		let attempt = 0;
		attempt < delays.length;
		attempt++
	) {

		await sleep(
			delays[attempt]
		);


		/* ---------------------------------------------
			 FIND THE V2 JOB
			 --------------------------------------------- */

		let job =
			await findJobByExternalMapping(
				legacyJobId,
				env
			);


		if (!job) {

			job =
				await findJobByManagerId(
					legacyJobId,
					env
				);

		}


		if (
			!job ||
			!job.id
		) {

			continue;

		}


		/* ---------------------------------------------
			 FETCH THE COMPLETE JOB
			 --------------------------------------------- */

		const getResponse =
			await vscoV2Request(
				'/job/' +
					encodeURIComponent(
						job.id
					),
				{
					method:
						'GET'
				},
				env
			);


		if (!getResponse.ok) {

			continue;

		}


		const currentJob =
			await getResponse.json();


		/* ---------------------------------------------
			 WAIT FOR LEGACY CREATION TO FINISH
			 --------------------------------------------- */

		if (
			!currentJob.jobTypeId ||
			!currentJob.leadStatusId ||
			!currentJob.leadSourceId ||
			!currentJob.brandId
		) {

			continue;

		}


		/* ---------------------------------------------
			 PRESERVE ALL WRITABLE JOB VALUES
			 --------------------------------------------- */

		const updatePayload =
			buildWritableJobPayload(
				currentJob
			);


		updatePayload.name =
			jobName;


		/* ---------------------------------------------
			 UPDATE
			 --------------------------------------------- */

		const updateResponse =
			await vscoV2Request(
				'/job/' +
					encodeURIComponent(
						currentJob.id
					),
				{
					method:
						'PUT',

					body:
						JSON.stringify(
							updatePayload
						)
				},
				env
			);


		if (!updateResponse.ok) {

			const errorBody =
				await updateResponse.text();


			console.error(
				'VSCO V2 job rename rejected.',
				{
					status:
						updateResponse.status,

					response:
						errorBody
				}
			);


			return false;

		}


		console.log(
			'Mark Thomas Films: VSCO job renamed safely.',
			{
				jobId:
					currentJob.id,

				name:
					jobName,

				jobTypeId:
					currentJob.jobTypeId,

				leadStatusId:
					currentJob.leadStatusId,

				leadSourceId:
					currentJob.leadSourceId
			}
		);


		return true;

	}


	console.warn(
		'Mark Thomas Films: job was created, but was not ready for safe V2 renaming.',
		legacyJobId
	);


	return false;

}


/* =========================================================
	 BUILD WRITABLE JOB PAYLOAD
	 ========================================================= */

function buildWritableJobPayload(
	job
) {

	const writableFields = [

		'bookingDate',
		'brandId',
		'closed',
		'closedReasonId',
		'closedDate',
		'completedDate',
		'contactFormId',
		'customFields',
		'eventDate',
		'fulfillmentDate',
		'guestCount',
		'inquiryDate',
		'jobTypeId',
		'leadConfidence',
		'leadDecisionExpectedByDate',
		'leadMaxBudget',
		'leadNotes',
		'leadRating',
		'leadSourceId',
		'leadStatusId',
		'name',
		'pinned',
		'stage',
		'webLead',
		'workflowId'

	];


	const payload = {};


	writableFields.forEach(
		function (field) {

			if (
				Object.prototype.hasOwnProperty.call(
					job,
					field
				)
			) {

				payload[field] =
					job[field];

			}

		}
	);


	return payload;

}


/* =========================================================
	 FIND JOB USING EXTERNAL MAPPING
	 ========================================================= */

async function findJobByExternalMapping(
	legacyJobId,
	env
) {

	try {

		const response =
			await vscoV2Request(
				'/job' +
					'?externalMappingId=' +
					encodeURIComponent(
						legacyJobId
					) +
					'&pageSize=10' +
					'&includeClosed=true',
				{
					method:
						'GET'
				},
				env
			);


		if (!response.ok) {

			return null;

		}


		const result =
			await response.json();


		const items =
			Array.isArray(
				result.items
			)
				? result.items
				: [];


		if (
			items.length === 1
		) {

			return items[0];

		}


		return items.find(
			function (job) {

				return jobMatchesLegacyId(
					job,
					legacyJobId
				);

			}
		) || null;

	}

	catch (error) {

		return null;

	}

}


/* =========================================================
	 FALLBACK: FIND RECENT JOB BY MANAGER URL
	 ========================================================= */

async function findJobByManagerId(
	legacyJobId,
	env
) {

	try {

		const response =
			await vscoV2Request(
				'/job' +
					'?pageSize=100' +
					'&includeClosed=true' +
					'&sortBy=' +
					encodeURIComponent(
						'created desc'
					),
				{
					method:
						'GET'
				},
				env
			);


		if (!response.ok) {

			return null;

		}


		const result =
			await response.json();


		const items =
			Array.isArray(
				result.items
			)
				? result.items
				: [];


		return items.find(
			function (job) {

				return jobMatchesLegacyId(
					job,
					legacyJobId
				);

			}
		) || null;

	}

	catch (error) {

		return null;

	}

}


/* =========================================================
	 LEGACY JOB MATCH
	 ========================================================= */

function jobMatchesLegacyId(
	job,
	legacyJobId
) {

	if (!job) {

		return false;

	}


	const mappings =
		Array.isArray(
			job.externalMappings
		)
			? job.externalMappings
			: [];


	if (
		mappings.some(
			function (mapping) {

				return String(
					mapping.id || ''
				) ===
					String(
						legacyJobId
					);

			}
		)
	) {

		return true;

	}


	const managerHref =
		job.links &&
		job.links.self &&
		job.links.self.managerHref
			? String(
				job.links.self.managerHref
			)
			: '';


	return managerHref.endsWith(
		'/jobs/view/' +
			legacyJobId
	);

}


/* =========================================================
	 V2 REQUEST
	 ========================================================= */

function vscoV2Request(
	path,
	options,
	env
) {

	const headers = {

		'Accept':
			'application/json',

		'X-API-KEY':
			env.VSCO_API_KEY

	};


	if (
		options.method !==
			'GET'
	) {

		headers[
			'Content-Type'
		] =
			'application/json';

	}


	return fetch(
		VSCO_V2_BASE +
			path,
		{
			...options,
			headers:
				headers
		}
	);

}


/* =========================================================
	 LEAD SOURCE NORMALIZATION
	 ========================================================= */

function normalizeLeadSource(
	value
) {

	const source =
		cleanString(
			value
		).toLowerCase();


	switch (source) {

		case 'wedding professional':

			return 'Wedding Professional';


		case 'friend or family':

			return 'Friend or Family';


		case 'search engine':

			return 'Search Engine';


		case 'not specified':

			return 'Not Specified';


		case 'select an option':

		case '':

			return 'Not Specified';


		default:

			return 'Not Specified';

	}

}


/* =========================================================
	 BUILD QUOTE SUMMARY

	 VSCO's New Lead email collapses custom-field line breaks.

	 Therefore this intentionally uses:
	 • between major sections
	 | within a section

	 so it remains readable in both Workspace and email.
	 ========================================================= */

function buildQuoteSummary(
	sqf
) {

	const quote =
		formatQuoteHeader(
			sqf.quote
		);

	const video =
		cleanString(
			sqf.video
		);

	const videoAddons =
		cleanString(
			sqf.videoAddons
		);

	const photo =
		cleanString(
			sqf.photo
		);

	const photoAddons =
		cleanString(
			sqf.photoAddons
		);

	const payments = [

		cleanString(
			sqf.payment1
		),

		cleanString(
			sqf.payment2
		),

		cleanString(
			sqf.payment3
		),

		cleanString(
			sqf.payment4
		)

	].filter(Boolean);


	const sections =
		[];


	if (quote) {

		sections.push(
			quote
		);

	}


	if (
		video ||
		videoAddons
	) {

		const videoParts =
			[];


		if (video) {

			videoParts.push(
				video
			);

		}


		if (
			videoAddons &&
			!isNotIncluded(video)
		) {

			videoParts.push(
				videoAddons
			);

		}


		if (
			videoParts.length
		) {

			sections.push(
				'VIDEO: ' +
					videoParts.join(
						' | '
					)
			);

		}

	}


	if (
		photo ||
		photoAddons
	) {

		const photoParts =
			[];


		if (photo) {

			photoParts.push(
				photo
			);

		}


		if (
			photoAddons &&
			!isNotIncluded(photo)
		) {

			photoParts.push(
				photoAddons
			);

		}


		if (
			photoParts.length
		) {

			sections.push(
				'PHOTO: ' +
					photoParts.join(
						' | '
					)
			);

		}

	}


	if (
		payments.length
	) {

		sections.push(
			'PAYMENT SCHEDULE: ' +
				payments.join(
					' | '
				)
		);

	}


	return sections
		.join(
			' • '
		)
		.trim();

}


/* =========================================================
	 FORMAT QUOTE HEADER
	 ========================================================= */

function formatQuoteHeader(
	value
) {

	const text =
		cleanString(
			value
		);


	if (!text) {

		return '';

	}


	return text
		.split(
			/\s*\|\s*/
		)
		.map(
			function (part) {

				return part.trim();

			}
		)
		.filter(Boolean)
		.join(
			' • '
		)
		.replace(
			/\bBundle\s+(-?\$[\d,]+(?:\.\d{1,2})?)/i,
			'Bundle: $1'
		);

}


/* =========================================================
	 QUOTE TOTAL
	 ========================================================= */

function parseQuoteTotal(
	value
) {

	if (
		typeof value ===
			'number' &&
		Number.isFinite(
			value
		)
	) {

		return value;

	}


	const text =
		cleanString(
			value
		);


	if (!text) {

		return null;

	}


	if (
		/^\d+(?:\.\d{1,2})?$/
			.test(
				text
			)
	) {

		const number =
			Number(
				text
			);


		return Number.isFinite(
			number
		)
			? number
			: null;

	}


	const match =
		text.match(
			/\$\s*([\d,]+(?:\.\d{1,2})?)/
		);


	if (!match) {

		return null;

	}


	const number =
		Number(
			match[1]
				.replace(
					/,/g,
					''
				)
		);


	return Number.isFinite(
		number
	)
		? number
		: null;

}


/* =========================================================
	 PHONE
	 ========================================================= */

function normalizePhone(
	value
) {

	const digits =
		cleanString(
			value
		).replace(
			/\D/g,
			''
		);


	if (!digits) {

		return '';

	}


	return digits.slice(
		0,
		20
	);

}


/* =========================================================
	 STRING HELPERS
	 ========================================================= */

function cleanString(
	value
) {

	if (
		typeof value !==
			'string'
	) {

		return '';

	}


	return value.trim();

}


function truncate(
	value,
	maxLength
) {

	if (!value) {

		return '';

	}


	return value.slice(
		0,
		maxLength
	);

}


function isNotIncluded(
	value
) {

	return cleanString(
		value
	).toLowerCase() ===
		'not included';

}


/* =========================================================
	 VALIDATION
	 ========================================================= */

function isValidEmail(
	email
) {

	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		.test(
			email
		);

}


function isValidDate(
	value
) {

	if (
		!/^\d{4}-\d{2}-\d{2}$/
			.test(
				value
			)
	) {

		return false;

	}


	const date =
		new Date(
			value +
				'T00:00:00Z'
		);


	return !Number.isNaN(
		date.getTime()
	);

}


/* =========================================================
	 WAIT
	 ========================================================= */

function sleep(
	ms
) {

	return new Promise(
		function (resolve) {

			setTimeout(
				resolve,
				ms
			);

		}
	);

}


/* =========================================================
	 CORS
	 ========================================================= */

function isAllowedOrigin(
	origin
) {

	return ALLOWED_ORIGINS
		.includes(
			origin
		);

}


function corsHeaders(
	origin
) {

	const headers = {

		'Access-Control-Allow-Methods':
			'POST, OPTIONS',

		'Access-Control-Allow-Headers':
			'Content-Type',

		'Cache-Control':
			'no-store',

		'Vary':
			'Origin'

	};


	if (
		origin &&
		isAllowedOrigin(
			origin
		)
	) {

		headers[
			'Access-Control-Allow-Origin'
		] =
			origin;

	}


	return headers;

}


/* =========================================================
	 JSON RESPONSE
	 ========================================================= */

function jsonResponse(
	data,
	status = 200,
	origin = null
) {

	return new Response(
		JSON.stringify(
			data,
			null,
			2
		),
		{
			status:
				status,

			headers: {

				'Content-Type':
					'application/json; charset=UTF-8',

				...corsHeaders(
					origin
				)

			}
		}
	);

}