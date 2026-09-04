(function () {

	'use strict';


	function initForm() {

		/* ======================================================
			 MARK THOMAS FILMS — WEDDING INQUIRY FORM
			 ====================================================== */

		const BLOCK_ID =
			'block-c3a7e802903a447efe19';


		const block =
			document.getElementById(
				BLOCK_ID
			);


		if (!block) {
			return;
		}


		const feBlock =
			block.closest(
				'.fe-block'
			);


		const engine =
			block.closest(
				'.fluid-engine'
			);


		if (!feBlock || !engine) {
			return;
		}


		/* ======================================================
			 FIELD IDS
			 ====================================================== */

		const fields = {

			bride:
				'text-2dd925cf-236a-4db9-88c8-5ffc3e0781dd',

			groom:
				'text-b6bf8e74-0f94-43b2-a0d0-f612683beb09',

			email:
				'email-yui_3_17_2_1_1656615088309_7772',

			phone:
				'phone-59b7dd00-fea4-4efd-ab9b-adde45c85b45',

			date:
				'date-7ba629b5-c603-447b-a89b-248e22316a26',

			location:
				'text-dc95dc2e-45e3-4a34-823d-bfb2c6697f56',

			budget:
				'select-f72e8103-f244-4ad5-810b-d84088e9af0e'

		};


		const desktop =
			window.matchMedia(
				'(min-width: 768px)'
			);


		/* ======================================================
			 HELPERS
			 ====================================================== */

		function setStyle(
			element,
			property,
			value
		) {

			if (!element) {
				return;
			}


			element.style.setProperty(
				property,
				value,
				'important'
			);

		}


		function removeStyle(
			element,
			property
		) {

			if (!element) {
				return;
			}


			element.style.removeProperty(
				property
			);

		}


		function getField(id) {

			return block.querySelector(
				'#' + id
			);

		}
		
		/* ======================================================
			 VISUAL FIELD ORDER
			 ====================================================== */
		
		function classifyFieldOrder(fieldList) {
		
			if (!fieldList) {
				return;
			}
		
		
			const items =
				Array.from(
					fieldList.children
				);
		
		
			/*
			 * Clear our classes first in case Squarespace
			 * has re-rendered any part of the form.
			 */
		
			items.forEach(function (item) {
		
				item.classList.remove(
					'mtf-form-message',
					'mtf-form-optional'
				);
		
			});
		
		
			let optionalSectionStarted =
				false;
		
		
			items.forEach(function (item) {
		
				/*
				 * Message is the textarea field.
				 *
				 * It remains in its original DOM position;
				 * we're only giving CSS a hook for visual order.
				 */
		
				if (
					item.querySelector(
						'textarea'
					)
				) {
		
					item.classList.add(
						'mtf-form-message'
					);
		
					return;
				}
		
		
				const text =
					item.textContent
						.replace(
							/\s+/g,
							' '
						)
						.trim();
		
		
				/*
				 * Once we reach Optional Questions,
				 * mark that section and everything following
				 * it as optional.
				 */
		
				if (
					text.includes(
						'Optional Questions'
					)
				) {
		
					optionalSectionStarted =
						true;
		
				}
		
		
				if (optionalSectionStarted) {
		
					item.classList.add(
						'mtf-form-optional'
					);
		
				}
		
			});
		
		}


		/* ======================================================
			 NORMAL CONTROL WIDTHS

			 Date is deliberately excluded.
			 ====================================================== */

		function prepareControlWidths(field) {

			if (!field) {
				return;
			}


			field
				.querySelectorAll(
					'input:not([type="checkbox"]):not([type="radio"]):not([type="date"]), select'
				)
				.forEach(function (control) {

					setStyle(
						control,
						'width',
						'100%'
					);


					setStyle(
						control,
						'max-width',
						'100%'
					);


					setStyle(
						control,
						'min-width',
						'0'
					);


					setStyle(
						control,
						'box-sizing',
						'border-box'
					);

				});


			/*
			 * Squarespace uses extra wrappers around fields
			 * such as Phone and Select.
			 *
			 * Do NOT alter Date's internal wrapper.
			 */

			if (field.id === fields.date) {
				return;
			}


			Array
				.from(
					field.children
				)
				.filter(function (child) {

					return (
						child.tagName ===
						'DIV'
					);

				})
				.forEach(function (wrapper) {

					setStyle(
						wrapper,
						'width',
						'100%'
					);


					setStyle(
						wrapper,
						'max-width',
						'100%'
					);


					setStyle(
						wrapper,
						'min-width',
						'0'
					);


					setStyle(
						wrapper,
						'box-sizing',
						'border-box'
					);

				});

		}


		function placeField(
			id,
			column,
			row
		) {

			const field =
				getField(
					id
				);


			if (!field) {
				return;
			}


			setStyle(
				field,
				'grid-column',
				column
			);


			setStyle(
				field,
				'grid-row',
				row
			);


			setStyle(
				field,
				'width',
				'100%'
			);


			setStyle(
				field,
				'max-width',
				'100%'
			);


			setStyle(
				field,
				'min-width',
				'0'
			);


			setStyle(
				field,
				'box-sizing',
				'border-box'
			);


			setStyle(
				field,
				'margin',
				'0'
			);


			setStyle(
				field,
				'padding',
				'0'
			);


			setStyle(
				field,
				'justify-self',
				'stretch'
			);


			setStyle(
				field,
				'align-self',
				'start'
			);


			prepareControlWidths(
				field
			);

		}


		/* ======================================================
			 FORM BLOCK HEIGHT
			 ====================================================== */

		let resizeQueued =
			false;


		function resizeFormBox() {

			if (!desktop.matches) {
				return;
			}


			const formWrapper =
				block.querySelector(
					'.form-wrapper'
				);


			if (!formWrapper) {
				return;
			}


			/*
			 * Allow the form block to size to its
			 * actual content.
			 */

			setStyle(
				block,
				'height',
				'auto'
			);


			setStyle(
				feBlock,
				'height',
				'auto'
			);


			setStyle(
				feBlock,
				'align-self',
				'start'
			);


			const contentHeight =
				Math.ceil(
					block
						.getBoundingClientRect()
						.height
				);


			/*
			 * Match Squarespace Fluid Engine's
			 * desktop row-height calculation.
			 */

			const engineWidth =
				engine
					.getBoundingClientRect()
					.width;


			const rowHeight =
				Math.max(
					24,
					engineWidth * 0.0215
				);


			const fluidRowGap =
				11;


			const effectiveRowHeight =
				rowHeight +
				fluidRowGap;


			/*
			 * Intro occupies rows 1–6.
			 * Form begins on grid line 7.
			 */

			const formStartLine =
				7;


			/*
			 * Small buffer helps avoid clipping from
			 * fractional measurements or validation
			 * messages.
			 */

			const rowsNeeded =
				Math.ceil(
					(contentHeight + 12) /
					effectiveRowHeight
				);


			const formEndLine =
				formStartLine +
				rowsNeeded;


			const totalRows =
				formEndLine -
				1;


			/*
			 * Resize the form block.
			 */

			setStyle(
				feBlock,
				'grid-area',
				`7 / 7 / ${formEndLine} / 21`
			);


			/*
			 * Resize the enclosing Fluid Engine section.
			 */

			setStyle(
				engine,
				'grid-template-rows',
				`repeat(${totalRows}, minmax(calc(var(--container-width) * var(--row-height-scaling-factor)), auto))`
			);

		}


		function queueFormResize() {

			if (resizeQueued) {
				return;
			}


			resizeQueued =
				true;


			requestAnimationFrame(
				function () {

					resizeQueued =
						false;


					resizeFormBox();

				}
			);

		}


		/* ======================================================
			 DESKTOP FORM LAYOUT
			 ====================================================== */

		function applyDesktopLayout() {

			const fieldList =
				block.querySelector(
					'.field-list'
				);


			if (!fieldList) {
				return false;
			}
			
			
			classifyFieldOrder(
				fieldList
			);
			
			
			/* ----------------------------------------------------
				 GRID
				 ---------------------------------------------------- */

			setStyle(
				fieldList,
				'display',
				'grid'
			);


			setStyle(
				fieldList,
				'grid-template-columns',
				'repeat(12, minmax(0, 1fr))'
			);


			setStyle(
				fieldList,
				'column-gap',
				'24px'
			);


			setStyle(
				fieldList,
				'row-gap',
				'18px'
			);


			setStyle(
				fieldList,
				'align-items',
				'start'
			);


			/* ----------------------------------------------------
				 DEFAULT TOP-LEVEL FORM ITEMS /
				 CONDITIONAL WRAPPERS
				 ---------------------------------------------------- */

			fieldList
				.querySelectorAll(
					':scope > *'
				)
				.forEach(function (item) {

					/*
					 * Normal Squarespace fields are direct
					 * .form-item children.
					 *
					 * Conditional fields may be inserted
					 * inside an additional wrapper DIV,
					 * so include any direct child that
					 * contains a .form-item as well.
					 */

					const isFormItem =
						item.classList.contains(
							'form-item'
						);


					const containsFormItem =
						Boolean(
							item.querySelector(
								'.form-item'
							)
						);


					if (
						!isFormItem &&
						!containsFormItem
					) {
						return;
					}


					setStyle(
						item,
						'grid-column',
						'1 / -1'
					);


					setStyle(
						item,
						'grid-row',
						'auto'
					);


					setStyle(
						item,
						'width',
						'100%'
					);


					setStyle(
						item,
						'max-width',
						'100%'
					);


					setStyle(
						item,
						'min-width',
						'0'
					);


					setStyle(
						item,
						'box-sizing',
						'border-box'
					);


					setStyle(
						item,
						'margin',
						'0'
					);


					setStyle(
						item,
						'padding',
						'0'
					);


					setStyle(
						item,
						'justify-self',
						'stretch'
					);


					setStyle(
						item,
						'align-self',
						'start'
					);


					/*
					 * If this is a conditional-field
					 * wrapper, make the actual nested
					 * form field and its input fill
					 * the wrapper.
					 */

					if (containsFormItem) {

						const nestedFields =
							item.querySelectorAll(
								'.form-item'
							);


						nestedFields.forEach(
							function (field) {

								setStyle(
									field,
									'width',
									'100%'
								);


								setStyle(
									field,
									'max-width',
									'100%'
								);


								setStyle(
									field,
									'min-width',
									'0'
								);


								setStyle(
									field,
									'box-sizing',
									'border-box'
								);


								prepareControlWidths(
									field
								);

							}
						);

					}

				});


			/* ----------------------------------------------------
				 ROW 1 — BRIDE / GROOM
				 ---------------------------------------------------- */

			placeField(
				fields.bride,
				'1 / 7',
				'1'
			);


			placeField(
				fields.groom,
				'7 / 13',
				'1'
			);


			/* ----------------------------------------------------
				 ROW 2 — EMAIL / PHONE
				 ---------------------------------------------------- */

			placeField(
				fields.email,
				'1 / 7',
				'2'
			);


			placeField(
				fields.phone,
				'7 / 13',
				'2'
			);


			/* ----------------------------------------------------
				 ROW 3 — LOCATION / BUDGET
				 ---------------------------------------------------- */

			placeField(
				fields.location,
				'1 / 7',
				'3'
			);


			placeField(
				fields.budget,
				'7 / 13',
				'3'
			);


			/* ----------------------------------------------------
				 ROW 4 — DATE

				 Full-width row, but the Squarespace Date
				 control itself keeps its native styling
				 and native width.
				 ---------------------------------------------------- */

			placeField(
				fields.date,
				'1 / 13',
				'4'
			);


			/* ----------------------------------------------------
				 FORM CONTAINER
				 ---------------------------------------------------- */

			const formWrapper =
				block.querySelector(
					'.form-wrapper'
				);


			if (formWrapper) {

				/*
				 * Reduce excess space beneath SEND.
				 */

				setStyle(
					formWrapper,
					'padding-bottom',
					'3%'
				);

			}


			queueFormResize();


			return true;

		}


		/* ======================================================
			 RESTORE NATIVE MOBILE FORM
			 ====================================================== */

		function restoreMobileLayout() {

			const fieldList =
				block.querySelector(
					'.field-list'
				);


			const formWrapper =
				block.querySelector(
					'.form-wrapper'
				);


			if (fieldList) {
			
			classifyFieldOrder(
				fieldList
			);
			
			
			[
				'display',
					'grid-template-columns',
					'column-gap',
					'row-gap',
					'align-items'
				]
					.forEach(function (property) {

						removeStyle(
							fieldList,
							property
						);

					});


				fieldList
					.querySelectorAll(
						':scope > .form-item'
					)
					.forEach(function (field) {

						[
							'grid-column',
							'grid-row',
							'width',
							'max-width',
							'min-width',
							'box-sizing',
							'margin',
							'padding',
							'justify-self',
							'align-self'
						]
							.forEach(function (property) {

								removeStyle(
									field,
									property
								);

							});

					});

			}


			/*
			 * Restore normal input/select sizing.
			 *
			 * Date was never internally changed,
			 * so nothing Date-specific needs undoing.
			 */

			Object
				.values(
					fields
				)
				.forEach(function (id) {

					const field =
						getField(
							id
						);


					if (!field) {
						return;
					}


					field
						.querySelectorAll(
							'input:not([type="checkbox"]):not([type="radio"]):not([type="date"]), select'
						)
						.forEach(function (control) {

							[
								'width',
								'max-width',
								'min-width',
								'box-sizing'
							]
								.forEach(function (property) {

									removeStyle(
										control,
										property
									);

								});

						});


					/*
					 * Date's direct child wrapper
					 * was never modified.
					 */

					if (field.id === fields.date) {
						return;
					}


					Array
						.from(
							field.children
						)
						.filter(function (child) {

							return (
								child.tagName ===
								'DIV'
							);

						})
						.forEach(function (wrapper) {

							[
								'width',
								'max-width',
								'min-width',
								'box-sizing'
							]
								.forEach(function (property) {

									removeStyle(
										wrapper,
										property
									);

								});

						});

				});


			if (formWrapper) {

				removeStyle(
					formWrapper,
					'padding-bottom'
				);

			}


			/*
			 * Return Fluid Engine sizing
			 * to Squarespace.
			 */

			removeStyle(
				block,
				'height'
			);


			removeStyle(
				feBlock,
				'height'
			);


			removeStyle(
				feBlock,
				'align-self'
			);


			removeStyle(
				feBlock,
				'grid-area'
			);


			removeStyle(
				engine,
				'grid-template-rows'
			);

		}


		/* ======================================================
			 UPDATE
			 ====================================================== */

		function updateFormLayout() {

			if (desktop.matches) {

				applyDesktopLayout();

			}

			else {

				restoreMobileLayout();

			}

		}


		/* ======================================================
			 WATCH SQUARESPACE RENDERING
			 ====================================================== */

		let mutationQueued =
			false;


		const mutationObserver =
			new MutationObserver(
				function () {

					if (mutationQueued) {
						return;
					}


					mutationQueued =
						true;


					requestAnimationFrame(
						function () {

							mutationQueued =
								false;


							updateFormLayout();

						}
					);

				}
			);


		mutationObserver.observe(
			block,
			{
				childList: true,
				subtree: true
			}
		);


		/* ======================================================
			 WATCH FORM HEIGHT
			 ====================================================== */

		const resizeObserver =
			new ResizeObserver(
				function () {

					queueFormResize();

				}
			);


		resizeObserver.observe(
			block
		);


		desktop.addEventListener(
			'change',
			updateFormLayout
		);


		window.addEventListener(
			'resize',
			queueFormResize
		);


		/* ======================================================
			 INITIAL RUN
			 ====================================================== */

		updateFormLayout();

	}


	/* ======================================================
			 SQUARESPACE-SAFE INITIALIZATION
			 ====================================================== */
	
		let initStarted =
			false;
	
	
		let initObserver =
			null;
	
	
		let initTimeout =
			null;
	
	
		function tryInitForm() {
	
			if (initStarted) {
				return true;
			}
	
	
			const block =
				document.getElementById(
					'block-c3a7e802903a447efe19'
				);
	
	
			if (!block) {
				return false;
			}
	
	
			const feBlock =
				block.closest(
					'.fe-block'
				);
	
	
			const engine =
				block.closest(
					'.fluid-engine'
				);
	
	
			const fieldList =
				block.querySelector(
					'.field-list'
				);
	
	
			/*
			 * Squarespace may create the outer block before
			 * the complete form structure exists.
			 *
			 * Don't initialize until everything our form
			 * script depends on is actually present.
			 */
	
			if (
				!feBlock ||
				!engine ||
				!fieldList
			) {
				return false;
			}
	
	
			initStarted =
				true;
	
	
			if (initObserver) {
	
				initObserver.disconnect();
	
				initObserver =
					null;
	
			}
	
	
			if (initTimeout) {
	
				clearTimeout(
					initTimeout
				);
	
				initTimeout =
					null;
	
			}
	
	
			console.info(
				'Mark Thomas Films: wedding inquiry form initialized.'
			);
	
	
			initForm();
	
	
			return true;
	
		}
	
	
		function watchForForm() {
	
			/*
			 * It may already exist.
			 */
	
			if (tryInitForm()) {
				return;
			}
	
	
			/*
			 * Otherwise watch Squarespace while it builds
			 * or hydrates the page.
			 */
	
			initObserver =
				new MutationObserver(
					function () {
	
						tryInitForm();
	
					}
				);
	
	
			initObserver.observe(
				document.documentElement,
				{
					childList: true,
					subtree: true
				}
			);
	
	
			/*
			 * Don't leave a document-wide observer running
			 * indefinitely if this isn't the inquiry page.
			 */
	
			initTimeout =
				setTimeout(
					function () {
	
						if (initObserver) {
	
							initObserver.disconnect();
	
							initObserver =
								null;
	
						}
	
					},
					15000
				);
	
		}
	
	
		/*
		 * Do NOT depend on DOMContentLoaded here.
		 *
		 * External scripts loaded through loader.js can arrive
		 * before or after that event, and Squarespace can render
		 * Fluid Engine content independently of it.
		 */
	
		watchForForm();
	
	})();