console.log(
	'Mark Thomas Films: site.js loaded from GitHub/jsDelivr.'
);


/* =========================================================
	 MARK THOMAS FILMS
	 SQUARESPACE INQUIRY → VSCO WORKSPACE
	 ========================================================= */

(function () {

	'use strict';


	const VSCO_INQUIRY_ENDPOINT =
		'https://markthomasfilms-vsco.mark-a7f.workers.dev/inquiry';


	/*
	 * This field uniquely identifies Mark's wedding
	 * inquiry form so we don't attach to other forms.
	 */

	const INQUIRY_FORM_MARKER =
		'#date-bc65af03-f0ac-46ed-9e73-868034e27884-field';


	let lastSubmissionFingerprint =
		'';

	let lastSubmissionTime =
		0;


	/* =====================================================
		 FIELD VALUE
		 ===================================================== */

	function fieldValue(
		form,
		selector
	) {

		const field =
			form.querySelector(
				selector
			);


		if (!field) {

			return '';

		}


		return String(
			field.value || ''
		).trim();

	}


	/* =====================================================
		 HIDDEN SQF FIELD VALUE
		 ===================================================== */

	function sqfValue(
		form,
		name
	) {

		const field =
			form.querySelector(
				'input[name="' +
				name +
				'"]'
			);


		return field
			? String(
				field.value || ''
			).trim()
			: '';

	}


	/* =====================================================
		 BUILD PAYLOAD
		 ===================================================== */

	function buildInquiryPayload(
		form
	) {

		return {

			weddingDate:
				fieldValue(
					form,
					'#date-bc65af03-f0ac-46ed-9e73-868034e27884-field'
				),

			firstName:
				fieldValue(
					form,
					'input[name="fname"]'
				),

			lastName:
				fieldValue(
					form,
					'input[name="lname"]'
				),

			email:
				fieldValue(
					form,
					'#email-eef99595-ffb8-416b-bf61-c152c18fe5fe-field'
				),

			phone:
				fieldValue(
					form,
					'#phone-f8a8cf1d-b117-4560-92d1-bb828a3199bd-input-field'
				),

			eventLocation:
				fieldValue(
					form,
					'#text-934d1b62-ef97-429a-9ec9-0f12b5c40824-field'
				),

			leadSource:
				fieldValue(
					form,
					'#select-322fbed7-9533-4db5-9f07-f5d13d927ced-field'
				),

			referralName:
				fieldValue(
					form,
					'#text-3fd04055-f9e4-4830-b67b-522f09f488e3-field'
				),

			message:
				fieldValue(
					form,
					'#textarea-2813b72f-16aa-4ab1-8219-7869f56c11bf-field'
				),


			/*
			 * Squarespace anti-spam field.
			 *
			 * Real visitors leave this empty.
			 */

			website:
				fieldValue(
					form,
					'#message-field'
				),


			/*
			 * Existing Mark Thomas Films Quote Builder
			 * hidden fields.
			 */

			sqf: {

				quote:
					sqfValue(
						form,
						'SQF_QUOTE'
					),

				video:
					sqfValue(
						form,
						'SQF_VIDEO'
					),

				videoAddons:
					sqfValue(
						form,
						'SQF_VIDEOADDONS'
					),

				photo:
					sqfValue(
						form,
						'SQF_PHOTO'
					),

				photoAddons:
					sqfValue(
						form,
						'SQF_PHOTOADDONS'
					),

				payment1:
					sqfValue(
						form,
						'SQF_PAYMENT1'
					),

				payment2:
					sqfValue(
						form,
						'SQF_PAYMENT2'
					),

				payment3:
					sqfValue(
						form,
						'SQF_PAYMENT3'
					),

				payment4:
					sqfValue(
						form,
						'SQF_PAYMENT4'
					)

			}

		};

	}


	/* =====================================================
		 MINIMUM DATA CHECK

		 Squarespace still performs its normal validation.
		 This simply prevents us from creating an obviously
		 incomplete VSCO lead.
		 ===================================================== */

	function hasMinimumInquiryData(
		payload
	) {

		return Boolean(
			payload.weddingDate &&
			payload.firstName &&
			payload.lastName &&
			payload.email
		);

	}


	/* =====================================================
		 DUPLICATE CLICK PROTECTION
		 ===================================================== */

	function isDuplicateSubmission(
		payload
	) {

		const fingerprint =
			JSON.stringify(
				payload
			);

		const now =
			Date.now();


		const duplicate =
			fingerprint ===
				lastSubmissionFingerprint &&
			now -
				lastSubmissionTime <
					10000;


		if (!duplicate) {

			lastSubmissionFingerprint =
				fingerprint;

			lastSubmissionTime =
				now;

		}


		return duplicate;

	}


	/* =====================================================
		 SEND COPY TO VSCO
		 ===================================================== */

	function sendToVsco(
		payload
	) {

		fetch(
			VSCO_INQUIRY_ENDPOINT,
			{
				method:
					'POST',

				mode:
					'cors',

				credentials:
					'omit',

				keepalive:
					true,

				headers: {

					'Content-Type':
						'application/json'

				},

				body:
					JSON.stringify(
						payload
					)
			}
		)

			.then(
				async function (
					response
				) {

					let result =
						null;


					try {

						result =
							await response.json();

					}

					catch (error) {

						result =
							null;

					}


					if (
						!response.ok ||
						!result ||
						result.ok !== true
					) {

						console.error(
							'Mark Thomas Films: VSCO inquiry copy failed.',
							{
								status:
									response.status,

								response:
									result
							}
						);

						return;

					}


					console.log(
						'Mark Thomas Films: inquiry copied to VSCO Workspace.',
						result.jobId
							? 'Job ' +
								result.jobId
							: ''
					);

				}
			)

			.catch(
				function (
					error
				) {

					console.error(
						'Mark Thomas Films: unable to send inquiry to VSCO Workspace.',
						error
					);

				}
			);

	}


	/* =====================================================
		 SQUARESPACE FORM SUBMIT

		 IMPORTANT:
		 We intentionally DO NOT call preventDefault().
		 Squarespace continues doing everything it already does.
		 ===================================================== */

	document.addEventListener(
		'submit',
		function (
			event
		) {

			const form =
				event.target;


			if (
				!form ||
				!form.querySelector ||
				!form.querySelector(
					INQUIRY_FORM_MARKER
				)
			) {

				return;

			}


			const payload =
				buildInquiryPayload(
					form
				);


			if (
				!hasMinimumInquiryData(
					payload
				)
			) {

				return;

			}


			if (
				isDuplicateSubmission(
					payload
				)
			) {

				return;

			}


			/*
			 * Fire the VSCO copy without interrupting
			 * Squarespace's native form submission.
			 */

			sendToVsco(
				payload
			);

		},
		true
	);


	console.log(
		'Mark Thomas Films: VSCO inquiry integration loaded.'
	);

})();