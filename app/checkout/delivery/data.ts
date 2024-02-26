export const cart = {
	id: 40,
	items: [
		{
			_order: 1,
			id: "65d7326092a134735c8b0174",
			quantity: 2,
			zoneId: 1,
			shippingPrice: null,
			productVariant: {
				id: 16,
				name: "Blomsterengjord - Sekk - 30L",
				product: {
					id: 8,
					imageGallery: [],
					name: "Blomsterengjord",
					subtitle: "Skriv noe her",
					shortDescription: "blablabla",
					productSummary: {
						root: {
							type: "root",
							format: "",
							indent: 0,
							version: 1,
							children: [
								{
									type: "paragraph",
									format: "",
									indent: 0,
									version: 1,
									children: [
										{
											mode: "normal",
											text: "adfgdfgv",
											type: "text",
											style: "",
											detail: 0,
											format: 0,
											version: 1,
										},
									],
									direction: "ltr",
								},
							],
							direction: "ltr",
						},
					},
					productSummary_html: "<p>adfgdfgv</p>",
					checkList: [],
					longDescription: {
						root: {
							type: "root",
							format: "",
							indent: 0,
							version: 1,
							children: [
								{
									type: "paragraph",
									format: "",
									indent: 0,
									version: 1,
									children: [
										{
											mode: "normal",
											text: "dfgsadfs",
											type: "text",
											style: "",
											detail: 0,
											format: 0,
											version: 1,
										},
									],
									direction: "ltr",
								},
							],
							direction: "ltr",
						},
					},
					longDescription_html: "<p>dfgsadfs</p>",
					weightInTonnesPerCubicMeter: 1.25,
					tags: [
						{
							_order: 1,
							id: "65c61eecf5dc4370f01831b3",
							tag: {
								id: 13,
								name: "Blomster",
								updatedAt: "2024-01-17T11:50:45.341Z",
								createdAt: "2024-01-17T11:50:45.341Z",
							},
						},
					],
					category: {
						id: 1,
						name: "Jord",
						slug: "jord",
						description:
							"Vi er en resirkuleringsbedrift med fokus på miljøvennlig og bærekraftig jord. Her finner du jord til alle formål. ",
						infoBlocks: [
							{
								_order: 1,
								id: "656dae0de75b922d076bed89",
								title: "Noe",
								description: "Greier her",
							},
						],
						updatedAt: "2024-01-11T11:55:44.045Z",
						createdAt: "2023-12-04T10:44:38.350Z",
					},
					filters: [
						{
							id: 4,
							name: "Dyrking og såing",
							updatedAt: "2024-01-11T11:42:24.650Z",
							createdAt: "2024-01-11T11:42:24.650Z",
						},
					],
					slug: "blomsterengjord",
					information: {
						tabs: [],
						alertBox: null,
					},
					userGuide: null,
					userGuide_html: "",
					updatedAt: "2024-02-09T12:47:52.606Z",
					createdAt: "2024-02-09T12:20:49.492Z",
				},
				packagingGroup: {
					packaging: {
						id: 5,
						name: "Sekk",
						deliveryType: {
							id: 1,
							name: "Enkeltprodukt",
							deliveryMethods: [
								{
									id: 2,
									name: "Hjemlevering - Lastebil med grabb som lesser på leveringssted",
									description: "Et fullt lass tar ca. 12 tonn (10m3) ",
									maximumLoad: [
										{
											_order: 1,
											id: "65c49c2efe1fc00019f963df",
											maximumLoad: 10,
											uom: 3,
										},
									],
									formBlocks: [
										{
											id: "65c4c9739d229d296aa10ec7",
											icon: "ruler",
											title: "Er veien 2 meter eller bredere?",
											description: "Hvis ikke kommer ikke lastebilen frem",
											blockName: "Er veien 2 meter eller bredere?",
											choices: [
												{
													_order: 1,
													id: "65c4c9c49d229d296aa10ec8",
													text: "Ja",
												},
												{
													_order: 2,
													id: "65c4c9c79d229d296aa10ec9",
													text: "Nei",
												},
												{
													_order: 3,
													id: "65c4c9c99d229d296aa10eca",
													text: "Vet ikke",
												},
											],
											blockType: "multiple-choice-block",
										},
									],
									isHomeDelivery: true,
									updatedAt: "2024-02-08T13:56:03.974Z",
									createdAt: "2024-02-08T09:17:51.779Z",
								},
								{
									id: 1,
									name: "Hjemlevering - Lastebil tipper på leveringssted",
									description: "Et fullt lass tar ca. 12 tonn (10m^3)",
									maximumLoad: [
										{
											_order: 1,
											id: "65c4977efe1fc00019f963de",
											maximumLoad: 12,
											uom: 3,
										},
									],
									formBlocks: [
										{
											id: "65c4ce1a38dd9e2b89dde51e",
											icon: "move-horizontal",
											title: "Er vegen 2 meter eller bredere",
											description:
												"Om vegen er smalere enn 2 meter vil ikke lastebilen komme frem.",
											blockName: "Er vegen 2 meter eller bredere",
											choices: [
												{
													_order: 1,
													id: "65c4cef138dd9e2b89dde51f",
													text: "Ja",
												},
												{
													_order: 2,
													id: "65c4cf0538dd9e2b89dde520",
													text: "Nei",
												},
												{
													_order: 3,
													id: "65c4cf0c38dd9e2b89dde521",
													text: "Vet ikke",
												},
											],
											blockType: "multiple-choice-block",
										},
										{
											id: "65c4d8ab38dd9e2b89dde522",
											icon: "corner-up-right",
											title: "Må lastebilen svinge mer enn 90 grader? ",
											description:
												"Om vegen har en skarp sving på mer enn 90 grader vil ikke lastebilen komme frem.",
											blockName: "Må lastebilen svinge mer enn 90 grader? ",
											choices: [
												{
													_order: 1,
													id: "65c4d99e38dd9e2b89dde523",
													text: "Ja",
												},
												{
													_order: 2,
													id: "65c4d9a638dd9e2b89dde524",
													text: "Nei",
												},
												{
													_order: 3,
													id: "65c4d9a938dd9e2b89dde525",
													text: "Vet ikke",
												},
											],
											blockType: "multiple-choice-block",
										},
										{
											id: "65dc650622ddb96d2a6a99bc",
											icon: "plus",
											title:
												"Du kan legge til 6 tonn uten tillegg i frakt for å fylle opp lastebilen.",
											description:
												"Tips: Hvis du fyller opp lastebilen betaler du mindre per tonn!",
											blockName:
												"Du kan legge til 6 tonn uten tillegg i frakt for å fylle opp lastebilen.",
											choices: [
												{
													_order: 1,
													id: "65dc653c22ddb96d2a6a99bd",
													text: "Ja takk, fyll opp lastebilen",
												},
											],
											blockType: "multiple-choice-block",
										},
									],
									isHomeDelivery: true,
									updatedAt: "2024-02-26T10:19:07.406Z",
									createdAt: "2024-02-08T08:57:51.293Z",
								},
								{
									id: 3,
									name: "Kontakt meg for avtale",
									description:
										"Vi tar kontakt via e-post i løpet av 2-3 virkedager",
									maximumLoad: [],
									formBlocks: [
										{
											id: "65d8bf6d5c758a5404994129",
											title: "Skriv en melding (valgfritt)",
											description: "test beskrivelse",
											placeholder: "Skriv en melding",
											blockName: "Skriv en melding (valgfritt)",
											blockType: "text-area-block",
										},
									],
									isHomeDelivery: false,
									updatedAt: "2024-02-23T15:53:17.559Z",
									createdAt: "2024-02-23T15:53:17.559Z",
								},
							],
							updatedAt: "2024-02-24T14:50:20.657Z",
							createdAt: "2024-01-09T08:18:04.972Z",
						},
						amountOptions: [
							{
								_order: 1,
								id: "65c61c1080b55f0019be8ad9",
								amount: 40,
							},
							{
								_order: 2,
								id: "65c61c1080b55f0019be8ada",
								amount: 30,
							},
						],
						uom: {
							id: 5,
							name: "Liter",
							abbreviation: "L",
							updatedAt: "2024-02-09T12:35:35.351Z",
							createdAt: "2024-02-09T12:35:35.351Z",
						},
						updatedAt: "2024-02-09T13:28:04.642Z",
						createdAt: "2024-02-09T12:35:47.669Z",
					},
					amount: "30",
					minAmount: 48,
					minIncrement: 48,
				},
				basePrice: 450,
				isAvailableInAllZones: false,
				zoneAvailabilities: [
					{
						_order: 1,
						id: "65d755a7ee1eee11467dc207",
						zonePrice: 50,
						zones: [
							{
								id: 1,
								name: "Grimstad Omre Sone 1",
								deliveryArea: {
									id: 1,
									name: "Grimstad Omre",
									vismaWarehouseId: "215",
									vismaWarehouseName: "Grimstad",
									productDeclarationArray: [],
									updatedAt: "2024-02-15T15:59:00.122Z",
									createdAt: "2023-12-06T12:10:55.114Z",
								},
								deliveryMethodPrices: [
									{
										_order: 1,
										id: "65d75777ee1eee11467dc20a",
										shippingPrice: 2500,
										deliveryMethod: {
											id: 2,
											name: "Hjemlevering - Lastebil med grabb som lesser på leveringssted",
											description: "Et fullt lass tar ca. 12 tonn (10m3) ",
											maximumLoad: [
												{
													_order: 1,
													id: "65c49c2efe1fc00019f963df",
													maximumLoad: 10,
													uom: {
														id: 3,
														name: "Tonn",
														abbreviation: "t",
														updatedAt: "2024-02-12T15:23:09.132Z",
														createdAt: "2024-01-09T09:25:40.700Z",
													},
												},
											],
											formBlocks: [
												{
													id: "65c4c9739d229d296aa10ec7",
													icon: "ruler",
													title: "Er veien 2 meter eller bredere?",
													description: "Hvis ikke kommer ikke lastebilen frem",
													blockName: "Er veien 2 meter eller bredere?",
													choices: [
														{
															_order: 1,
															id: "65c4c9c49d229d296aa10ec8",
															text: "Ja",
														},
														{
															_order: 2,
															id: "65c4c9c79d229d296aa10ec9",
															text: "Nei",
														},
														{
															_order: 3,
															id: "65c4c9c99d229d296aa10eca",
															text: "Vet ikke",
														},
													],
													blockType: "multiple-choice-block",
												},
											],
											isHomeDelivery: true,
											updatedAt: "2024-02-08T13:56:03.974Z",
											createdAt: "2024-02-08T09:17:51.779Z",
										},
									},
									{
										_order: 2,
										id: "65d7577dee1eee11467dc20b",
										shippingPrice: 1500,
										deliveryMethod: {
											id: 1,
											name: "Hjemlevering - Lastebil tipper på leveringssted",
											description: "Et fullt lass tar ca. 12 tonn (10m^3)",
											maximumLoad: [
												{
													_order: 1,
													id: "65c4977efe1fc00019f963de",
													maximumLoad: 12,
													uom: {
														id: 3,
														name: "Tonn",
														abbreviation: "t",
														updatedAt: "2024-02-12T15:23:09.132Z",
														createdAt: "2024-01-09T09:25:40.700Z",
													},
												},
											],
											formBlocks: [
												{
													id: "65c4ce1a38dd9e2b89dde51e",
													icon: "move-horizontal",
													title: "Er vegen 2 meter eller bredere",
													description:
														"Om vegen er smalere enn 2 meter vil ikke lastebilen komme frem.",
													blockName: "Er vegen 2 meter eller bredere",
													choices: [
														{
															_order: 1,
															id: "65c4cef138dd9e2b89dde51f",
															text: "Ja",
														},
														{
															_order: 2,
															id: "65c4cf0538dd9e2b89dde520",
															text: "Nei",
														},
														{
															_order: 3,
															id: "65c4cf0c38dd9e2b89dde521",
															text: "Vet ikke",
														},
													],
													blockType: "multiple-choice-block",
												},
												{
													id: "65c4d8ab38dd9e2b89dde522",
													icon: "corner-up-right",
													title: "Må lastebilen svinge mer enn 90 grader? ",
													description:
														"Om vegen har en skarp sving på mer enn 90 grader vil ikke lastebilen komme frem.",
													blockName: "Må lastebilen svinge mer enn 90 grader? ",
													choices: [
														{
															_order: 1,
															id: "65c4d99e38dd9e2b89dde523",
															text: "Ja",
														},
														{
															_order: 2,
															id: "65c4d9a638dd9e2b89dde524",
															text: "Nei",
														},
														{
															_order: 3,
															id: "65c4d9a938dd9e2b89dde525",
															text: "Vet ikke",
														},
													],
													blockType: "multiple-choice-block",
												},
												{
													id: "65dc650622ddb96d2a6a99bc",
													icon: "plus",
													title:
														"Du kan legge til 6 tonn uten tillegg i frakt for å fylle opp lastebilen.",
													description:
														"Tips: Hvis du fyller opp lastebilen betaler du mindre per tonn!",
													blockName:
														"Du kan legge til 6 tonn uten tillegg i frakt for å fylle opp lastebilen.",
													choices: [
														{
															_order: 1,
															id: "65dc653c22ddb96d2a6a99bd",
															text: "Jatakk, fyll opp lastebilen",
														},
													],
													blockType: "multiple-choice-block",
												},
											],
											isHomeDelivery: true,
											updatedAt: "2024-02-26T10:19:07.406Z",
											createdAt: "2024-02-08T08:57:51.293Z",
										},
									},
									{
										_order: 3,
										id: "65d8becfa26cb8583f3dc351",
										shippingPrice: -1,
										deliveryMethod: {
											id: 3,
											name: "Kontakt meg for avtale",
											description:
												"Vi tar kontakt via e-post i løpet av 2-3 virkedager",
											maximumLoad: [],
											formBlocks: [
												{
													id: "65d8bf6d5c758a5404994129",
													title: "Skriv en melding (valgfritt)",
													description: "test beskrivelse",
													placeholder: "Skriv en melding",
													blockName: "Skriv en melding (valgfritt)",
													blockType: "text-area-block",
												},
											],
											isHomeDelivery: false,
											updatedAt: "2024-02-23T15:53:17.559Z",
											createdAt: "2024-02-23T15:53:17.559Z",
										},
									},
								],
								places: [
									{
										_order: 1,
										id: "6576e7acc4ee29001836efd6",
										zipCode: "4887",
										postalLocation: "GRIMSTAD",
									},
									{
										_order: 2,
										id: "6576e7acc4ee29001836efd7",
										zipCode: "4879",
										postalLocation: "GRIMSTAD",
									},
									{
										_order: 3,
										id: "6576e7acc4ee29001836efd8",
										zipCode: "4886",
										postalLocation: "GRIMSTAD",
									},
									{
										_order: 4,
										id: "6576e7acc4ee29001836efd9",
										zipCode: "4885",
										postalLocation: "GRIMSTAD",
									},
									{
										_order: 5,
										id: "6576e7acc4ee29001836efda",
										zipCode: "4877",
										postalLocation: "GRIMSTAD",
									},
									{
										_order: 6,
										id: "6576e7acc4ee29001836efdb",
										zipCode: "4876",
										postalLocation: "GRIMSTAD",
									},
									{
										_order: 7,
										id: "6576e7acc4ee29001836efdc",
										zipCode: "4878",
										postalLocation: "GRIMSTAD",
									},
									{
										_order: 8,
										id: "6576e7acc4ee29001836efdd",
										zipCode: "4870",
										postalLocation: "FEVIK",
									},
									{
										_order: 9,
										id: "6576e7acc4ee29001836efde",
										zipCode: "4888",
										postalLocation: "HOMBORSUND",
									},
									{
										_order: 10,
										id: "6576e7acc4ee29001836efe0",
										zipCode: "4780",
										postalLocation: "BREKKESTØ",
									},
									{
										_order: 11,
										id: "6576eae2c4ee29001836efe1",
										zipCode: "4790",
										postalLocation: "LILLESAND",
									},
								],
								updatedAt: "2024-02-23T15:53:39.806Z",
								createdAt: "2023-12-06T12:11:08.232Z",
							},
						],
					},
				],
				vismaProducts: [],
				updatedAt: "2024-02-22T14:18:20.779Z",
				createdAt: "2024-02-09T12:38:13.759Z",
			},
		},
	],
	updatedAt: "2024-02-22T14:22:18.089Z",
	createdAt: "2024-02-22T11:39:12.715Z",
};
