// i18n.js

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
        en: {
            translation: {
                about: {
                    welcome: "Welcome to The Climate Net,",
                    titleTemp: "Temperature, Humidity and Pressure",
                    titleAir: "Air Quality",
                    titleWind: "Air Speed, Direction and Rain",
                    titleUv: "UV index",
                    titleWeather: "Weather Data: API Documentation",
                    measureTemp: "Measuring temperature",
                    measureHumidity: "Measuring Humidity",
                    measurePressure: "Measuring Pressure",
                    section1: " a pioneering hyper-local, student-led climate observatory. Our mission is to empower the next generation and raise awareness through real-time data tracking, all while making a significant contribution to mitigating climate change. We're dedicated to advocating for climate action beyond borders, because the challenges we face are global in nature.",
                    section2: "At The Climate Net, we believe in the power of youth to drive meaningful change. We're putting the future in the hands of those who will be most affected by it: the young citizens inheriting the consequences of choices made by previous generations. We're here to equip and inspire them to take charge of tracking climate change patterns that will have the most significant impact on their lives and the world they'll inherit.",
                    section5: "TUMO Labs is a tuition-free education program based on the just-in-time methodology that connects higher-education with industry. Anyone over the age of 18 can participate in the program designed specifically for TUMO Labs. The TUMO Labs education program consists of guided self-learning, project-based learning, Tech Incubation, and ",
                    section3: "The Climate Net project is empowered by",
                    section4: "TUMO Labs",
                    section6: "42 Yerevan",
                    section7: "programming school. These multi complementary methods enable students to acquire knowledge and practical skills in the fields of technology, applied science, and engineering. As a result, it equips students with the competitive skills needed to succeed in a globally connected job market and economy.",
                    temperatureContent: "The temperatures measuring ranging from -40°C to 85°C.",
                    temperatureContent2: "Over the temperature range of 0 to 65°C, the accuracy is ±1.0°C; outside of that range, the accuracy drops to ±1.5°C.",
                    humidityContent: "The relative humidity measured of the over a range of 0 to 100% with an accuracy of ±3%.",
                    humidityContent2: "According to the datasheet, the sensor can measure up to 100% humidity over a temperature range of 0 to 60°C. However, the maximum measurable humidity decreases at extremely high and low temperature",
                    pressureContent: "The pressure measured between 300Pa to 1100 hPa with an absolute accuracy of ±1 hPa.",
                    pressureContent2: "Over the temperature range of 0 to 65°C, full accuracy is obtained, resulting in an altitude measurement accuracy of approximately ±1 meter. Outside of that range, the accuracy drops to 1.7 hPa.",
                    airQualityIntro: "The high-precision particulate matter (PM) sensor with a sensitivity of 50% for 0.3 μm particles and 98% for 0.5 μm and larger particles.",
                    airQualityIntro2: "It provides a resolution of 1 μg/m³ and operates in temperatures ranging from -10 °C to 60 °C.",
                    airQualityIntro3: "The sensor is designed to work effectively in humidity levels from 0% to 99%, making it suitable for diverse environmental conditions.",
                    pm1: "These particles are so small they can bypass the body's natural defenses and penetrate deep into the lungs and bloodstream.",
                    pm1_2: "They can cause respiratory problems, heart disease, and even cancer.",
                    pm1_3: "Children and people with existing respiratory conditions are particularly vulnerable to the harmful effects of PM1.0.",
                    pm2: "These particles are also small enough to cause respiratory problems, but their larger size prevents them from reaching the deepest parts of the lungs.",
                    pm2_2: "However, they can still irritate the airways and trigger asthma attacks.",
                    pm2_3: "PM2.5 exposure has also been linked to an increased risk of cardiovascular disease.",
                    pm10: "These particles are larger and less likely to be inhaled deeply.",
                    pm10_2: "However, they can still irritate the eyes, nose, and throat.",
                    pm10_3: "Long-term exposure to PM10 can also lead to respiratory problems and heart disease.",
                    pmDanger: "PM Sensor Danger Values",
                    pmTh1: "Pollutant",
                    pmTh2: "Good",
                    pmTh3: "Moderate",
                    pmTh4: "Unhealthy for Sensitive Groups",
                    pmTh5: "Unhealthy",
                    pmTh6: "Very Unhealthy",
                    pmTh7: "Hazardous",
                    pmMu: "(μg/m³)",
                    titleWindSpeed: "Wind Speed",
                    windSpeed: "A rotating cup anemometer with magnets passes by a stationary reed switch. As the wind blows faster, the cup spins faster, triggering the reed switch more frequently, allowing the system to calculate wind speed.",
                    windSpeed2: "Sensor can measure wind speeds from 0.4 m/s to 45 m/s.",
                    titleWindDirection: "Wind Direction",
                    windDirection: "A wind vane with a magnet rotates based on the wind direction. This triggers different reed switches positioned around the vane, allowing the system to determine the wind direction.",
                    windDirection2: "The rain sensor can register rainfall amounts as small as 0.2794 mm (0.011 inches) per tip.",
                    uv_intro: "We measure light intensity and spectral information, making it valuable for various applications. Here's an in-depth look:",
                    uva: "Wavelength 315-400nm",
                    uva2: "UVA rays are the longest-wavelength UV radiation reaching Earth's surface. They penetrate deep into the skin, reaching the dermis layer.",
                    uva3: "While UVA is less energetic, it contributes significantly to skin aging and wrinkles. It can also weaken the immune system and increase the risk of skin cancer",
                    api_info: "Welcome, developers! Our Weather Data API provides you with access to weather information based on specific parameters. Follow the instructions below to integrate this API into your application.",
                    api_info_param: "Parameters:",
                    api_info_deviceId: " (required): Unique identifier for the device.",
                    api_info_startTime: " (Not required): Start date and time for the weather data retrieval",
                    api_info_endTime: " (Not required): End date and time for the weather data retrieval",
                    api_info_format: "format: ",
                    api_info_example: "Example Requests:",
                    api_info_24: "Retrieve Last 24 Hours Data:",
                    api_info_24_request: "If you use the following link without specifying",
                    and: "and",
                    api_info_24_request2: " you will receive the weather data for the last 24 hours.",
                    api_info_response: "Response:",
                    api_info_json: "The API returns weather data in JSON format, containing relevant information based on the provided parameters.",
                    api_info_usage: "Usage:",
                    api_info_usage2: "Make a GET request to the API endpoint",
                    api_info_usage3: " with the parameters ",
                    api_info_usage4: "Parse the JSON response to extract the weather data.",
                    api_info_usage5: "Utilize the retrieved weather data in your application as needed, such as displaying it to users, performing analysis, or integrating it with other services.",
                    api_info_note: "Note:",
                    api_info_note2: "Ensure that you handle any errors gracefully, such as invalid parameters or network issues, to provide a seamless experience for your users.",
                    api_info_note3: "For further assistance or inquiries, contact our support team at ",
                    api_info_note4: "Tagging Requirement: When using the Weather Data API, please include the appropriate tag to acknowledge the data source. Example:",
                    api_info_note5: "Weather Data provided by TUMO Labs",
                    api_info_done: "Happy coding!"
                },
                banner: {
                    title: 'Climate Network: Connecting Armenia through a growing network of real-time climate data.',
                    text: {
                        1: 'Monitor climate changes in real-time.',
                        2: 'Accurate temperature and humidity measurements.',
                        3: 'Detect real-time climate changes in the regions of Armenia.',
                    },
                },
                scrollableSection: {
                    section1: "A pioneering hyper-local, student-led climate observatory. Our mission is to empower the next generation and raise awareness through real-time data tracking, all while making a significant contribution to mitigating climate change. We're dedicated to advocating for climate action beyond borders, because the challenges we face are global in nature.",
                    section2: "Unlock the Power of Weather Insights",
                    section3: "Powered by TUMO Labs",
                    section4: "Explore Climate Data"
                },
                description: {
                    sections: [
                        {
                            title: "Climate Friends:",
                            content: "Meet our partners and friends who have supported us and continue to do so.",
                            partner1: "The Amazon Web Services provides us with cloud credits to help us store and manage our data with high standards.",
                            partner2: "TUMO Boxes are low-cost and easy-to-deploy facilities built out of shipping containers. Strategically placed so that every teen in Armenia can reach one in 40 minutes or less, these self-contained learning environments are equipped with state-of-the-art workstations and equipment and can host up to 320 students per week. The boxes provide access to the TUMO program and the entire network of coaches. These satellite locations act as the foundation for the ClimateNet devices. The devices are deployed on these boxes across the country to provide us with the local and accurate data.workshop leaders, and fellow students."
                        },
                        {
                            title: "Student Contributors:",
                            content: "Meet TUMO Labs’ interns during the course of the project. The project calls for new additional members every 6 months. After an intensive 3 months of theoretical & practical workshops the top students will be selected to join the final stage as an intern. During the internship the students will be helping to build, install, and monitor the device."
                        }
                    ]
                },
                teamMembers: {
                    2: {
                        name: "Hovhannes",
                        position: "Software Engineer"
                    },
                    3: {
                        name: "Marina",
                        position: "Backend Developer"
                    },
                    4: {
                        name: "Arsen",
                        position: "DevOps Engineer"
                    },
                    5: {
                        name: "Vahe",
                        position: "Frontend Developer"
                    }
                },
                map: {
                    mapHeader: "Map",
                    mapDescription: "The highlighted locations indicate the current active climate devices. Click on a location to access the dataset specific to that device.",
                    clickOnMap: "Click on map to zoom in or out",
                },
                contact: {
                    title: "Contact Us",
                    formFields:
                        {
                            name: "Name",
                            surname: "Surname",
                            subject: "Subject",
                            email: "Email",
                            message: "Message",
                            templateMessage: "Hello TUMO Labs Team,",
                            templateMessage2: "Regards,",
                            submit: "Send"
                        },
                    options: [
                        "Need Data",
                        "Join To Project",
                        "Technical Support",
                        "Feedback"
                    ]
                },
                footer: {
                    title: "Follow Us",
                    address: "Halabyan 2a, Yerevan, Armenia",
                    projects: {
                        upcomingProjects: "TUMO Labs Upcoming Projects",
                        pastProjects: "Past Projects"
                    },
                    rightsReserved: " TUMO Labs. All Rights Reserved."
                },
                devices: {
                    deviceNames: {
                        Maralik: "Maralik",
                        Panik: "Panik",
                        Azatan: "Azatan",
                        Artik: "Artik",
                        "V. Sargsyan": "V. Sargsyan"
                    },
                    parentNames: {
                        Shirak: "Shirak",
                        Yerevan: "Yerevan"
                    }
                },
                header: {
                    navItems: {
                        home: "Home",
                        about: "About",
                        map: "Map",
                        devices: "Devices",
                    },
                    language: "Language",
                },
                linerStatusBar: {
                    airQualityTitle: "Air Quality (PM2.5)",
                    good: "Good",
                    moderate: "Moderate",
                    unhealthySensitiveGroups: "Unhealthy for Sensitive Groups",
                    unhealthy: "Unhealthy",
                    veryUnhealthy: "Very Unhealthy",
                    hazardous: "Hazardous",
                    feelsLike: "FEELS LIKE ",
                    recommendation: "Comment section, here can be some recommendations",
                    wind: "Wind ",
                    humidity: "Humidity",
                    barometricPressure: "Barometric P.",
                    light: "Light",
                    uv_index: "UV",
                    rain: "Rain",
                    pm1: "PM 1",
                    pm10: "PM 10",
                    pm2_5: "PM 2.5",
                    lux: "Lux",
                    hPa: "hPa",
                    mm: "mm",
                    myum: "μm",
                    kmhour: "km/h",
                    micro: "micro",
                    uv: "mW/cm2"
                },
                nearbyDevicesItem: {
                    km: "km"
                },
                innerPageDynamicContent: {
                    tabTitles: {
                        temperatureAndHumidity: "Temperature and Humidity",
                        airQuality: "Air Quality",
                        pressure: "Pressure",
                        rainAndWind: "Rain and Wind"
                    },
                    temperature: "Temperature",
                    humidity: "Humidity",
                    pressure: "Pressure",
                    rain: "Rain",
                    windSpeed: "Wind Speed",
                    windDirection: "Wind Direction"
                },
                innerPageFilter: {
                    options: {
                        hourly: "Hourly",
                        daily: "7 Days",
                        monthly: "Current Month",
                        range: "Range",
                        filter: "Filter"
                    },
                },
                innerPageNearbyDevices: {
                    titles: {
                        devicesNearYou: "Devices Near You",
                        devicesNear: "Devices Near"
                    },
                },
                innerPage: {
                    data: "Data Not Found"
                },
                downloadButton: {
                    download: "Download Full Data"
                },
                chartTitles: {
                    dataPer: "Data per ",
                    monthly: "last month",
                    daily: "last week",
                    hourly: "day",
                    range: "selected dates",
                    update: "Updating..."
                },
                filterTooltips: {
                    filter: "Filter",
                    to: "to",
                    from: "from",
                    oneM: "1 Month",
                    sevenD: "7 Days",
                    oneD: "1 Day"
                },
            },
        },

        hy: {
            translation: {
                about: {
                    welcome: "Բարի գալուստ Կլիմայական ցանց, ",
                    titleTemp: "Ջերմաստիճան, խոնավություն և ճնշում",
                    titleAir: "Օդի որակ",
                    titleWind: "Քամու արագություն, ուղղություն և անձրև",
                    titleUv: "UV ինդեքս",
                    titleWeather: "Եղանակի տվյալներ. API Documentation",
                    measureTemp: "Ջերմաստիճանի չափում",
                    measureHumidity: "Խոնավության չափում",
                    measurePressure: "Ճնշման չափում",
                    section1: "Ուսանողների կողմից ղեկավարվող նորարարական հիպերլոկալ կլիմայի աստղադիտարան: Մեր առաքելությունն է ընդլայնել հաջորդ սերնդի հնարավորությունները և բարձրացնել իրազեկությունը իրական ժամանակում տվյալների հետևման միջոցով ՝ միաժամանակ զգալի ներդրում ունենալով կլիմայի փոփոխության մեղմացման գործում: Մենք հանձնառու ենք խթանել կլիմայի փոփոխության գործողությունները սահմաններից դուրս, քանի որ մեր առջև ծառացած մարտահրավերները գլոբալ են:",
                    section2: "Կլիմայական ցանցում մենք հավատում ենք երիտասարդների ՝ իմաստալից փոփոխություններ խթանելու ունակությանը: Մենք ապագան դնում ենք նրանց ձեռքում, ովքեր կժառանգեն նախորդ սերունդների կատարած ընտրության հետևանքները՝ երիտասարդ քաղաքացիների: Մենք այստեղ ենք, որպեսզի զինենք և ոգեշնչենք նրանց ստանձնել պատասխանատվություն ՝ հետևելու կլիմայի փոփոխության օրինաչափություններին, որոնք առավել էական ազդեցություն կունենան իրենց կյանքի և իրենց ժառանգած աշխարհի վրա:",
                    section5: "ԹՈՒՄՈ Լաբերը «ճիշտ ժամանակին» մեթոդաբանության վրա հիմնված անվճար կրթական ծրագիր է, որը բարձրագույն կրթությունը կապում է արդյունաբերության հետ: 18 տարեկանից բարձր յուրաքանչյուր ոք կարող է մասնակցել հատուկ Թումո լաբերի համար մշակված ծրագրին: Թումո լաբերի կրթական ծրագիրը բաղկացած է ինքնուրույն ուղղորդված ուսուցումից, նախագծային ուսուցումից, տեխնիկական ինկուբացիայից և",
                    section3: "Կլիմայական ցանց նախագիծը լիազորված է",
                    section4: "ԹՈՒՄՈ Լաբերի կողմից։ ",
                    section6: " 42 Երևան",
                    section7: "ծրագրավորման դպրոցից: Այս բազմակողմանի մեթոդները ուսանողներին հնարավորություն են տալիս ձեռք բերել գիտելիքներ և գործնական հմտություններ տեխնոլոգիայի, կիրառական գիտության և ճարտարագիտության ոլորտներում: Արդյունքում այն ուսանողներին ապահովում է մրցակցային հմտություններով, որոնք անհրաժեշտ են գլոբալ կապակցված աշխատաշուկայում և տնտեսությունում հաջողության հասնելու համար:",
                    temperatureContent: "Ջերմաստիճանը տատանվում է -40°C-ից մինչև 85°C:",
                    temperatureContent2: "0-ից 65°C ջերմաստիճանի տիրույթում ճշգրտությունը ±1.0°C է, այդ միջակայքից դուրս ճշտությունը նվազում է մինչև ±1.5°C։",
                    humidityContent: "0-ից 100% տիրույթում չափված հարաբերական խոնավությունը ±3% ճշգրտությամբ։",
                    humidityContent2: "Ըստ տվյալների աղյուսակի, սենսորը կարող է չափել մինչև 100% խոնավություն 0-ից 60°C ջերմաստիճանի միջակայքում: Այնուամենայնիվ, առավելագույն չափելի խոնավությունը նվազում է չափազանց բարձր և ցածր ջերմաստիճաններում։",
                    pressureContent: "Ճնշումը չափված է 300Պա-ից մինչև 1100հՊա՝ ±1հՊա բացարձակ ճշգրտությամբ։",
                    pressureContent2: "0-ից 65°C ջերմաստիճանի տիրույթում ձեռք է բերվում ամբողջական ճշգրտություն, որի արդյունքում բարձրության չափման ճշգրտությունը կազմում է մոտավորապես ±1 մետր: Այդ միջակայքից դուրս ճշգրտությունը իջնում է մինչև 1,7 հՊա։",
                    airQualityIntro: "Բարձր ճշգրիտ մասնիկների (PM) ցուցիչ՝ 50% զգայունությամբ 0,3 մկմ մասնիկների համար և 98% 0,5 մկմ և ավելի մեծ մասնիկների համար։",
                    airQualityIntro2: "Այն ապահովում է 1 մկգ/մ³ թույլտվություն և գործում է -10 °C-ից մինչև 60 °C ջերմաստիճաններում:",
                    airQualityIntro3: "Սենսորը նախագծված է արդյունավետ աշխատելու խոնավության մակարդակներում 0%-ից 99%՝ այն հարմարեցնելով շրջակա միջավայրի տարբեր պայմանների համար:",
                    pm1: "Այս մասնիկները այնքան փոքր են, որ կարող են շրջանցել մարմնի բնական պաշտպանությունը և խորը ներթափանցել թոքեր և արյան հոսք:",
                    pm1_2: "Դրանք կարող են առաջացնել շնչառական խնդիրներ, սրտի հիվանդություն և նույնիսկ քաղցկեղ։",
                    pm1_3: "Երեխաները և առկա շնչառական խնդիրներ ունեցող մարդիկ հատկապես խոցելի են PM1.0-ի վնասակար հետևանքներից:",
                    pm2: "Այս մասնիկները նույնպես բավական փոքր են, որպեսզի շնչառական խնդիրներ առաջացնեն, բայց դրանց ավելի մեծ չափերը թույլ չեն տալիս հասնել թոքերի ամենախորը հատվածներին։",
                    pm2_2: "Սակայն նրանք դեռ կարող են գրգռել շնչուղիները և առաջացնել ասթմայի նոպաներ:",
                    pm2_3: "PM2.5-ի ազդեցությունը նույնպես կապված է սրտանոթային հիվանդությունների բարձր ռիսկի հետ:",
                    pm10: "Այս մասնիկները ավելի մեծ են և ավելի քիչ հավանական է, որ խորը ներշնչվեն:",
                    pm10_2: "Սակայն նրանք դեռ կարող են գրգռել աչքերը, քիթը և կոկորդը:",
                    pm10_3: "PM10-ի երկարատև ազդեցությունը կարող է նաև հանգեցնել շնչառական խնդիրների և սրտի հիվանդության:",
                    pmDanger: "PM սենսորի վտանգներ",
                    pmTh1: "Աղտոտիչ",
                    pmTh2: "Լավ",
                    pmTh3: "Չափավոր",
                    pmTh4: "Անառողջ զգայուն խմբերի համար",
                    pmTh5: "Անառողջ",
                    pmTh6: "Շատ անառողջ",
                    pmTh7: "Վտանգավոր",
                    pmMu: "(μգ/մ³)",
                    titleWindSpeed: "Քամու արագություն",
                    windSpeed: "Մագնիսներով պտտվող գավաթային անեմոմետրը անցնում է անշարժ եղեգի անջատիչի կողքով: Քանի որ քամին ավելի արագ է փչում, բաժակն ավելի արագ է պտտվում՝ ավելի հաճախ գործարկելով եղեգի անջատիչը՝ թույլ տալով համակարգին հաշվարկել քամու արագությունը:",
                    windSpeed2: "Սենսորը կարող է չափել քամու արագությունը 0,4 մ/վ-ից մինչև 45 մ/վրկ:",
                    titleWindDirection: "Քամու ուղղություն",
                    windDirection: "Քամու ուղղությունը մագնիսով պտտվում է` ելնելով քամու ուղղությունից: Սա գործարկում է եղեգի տարբեր անջատիչները, որոնք տեղադրվում են թիակի շուրջը, ինչը թույլ է տալիս համակարգին որոշել քամու ուղղությունը:",
                    windDirection2: "Անձրևի սենսորը կարող է գրանցել 0,2794 մմ (0,011 դյույմ) անձրևի քանակություն մեկ ծայրի համար:",
                    uv_intro: "Մենք չափում ենք լույսի ինտենսիվությունը և սպեկտրային տեղեկատվությունը, ինչը արժեքավոր է դարձնում տարբեր ծրագրեր:",
                    uva: "Ալիքի երկարություն 315-400 նմ",
                    uva2: "UVA ճառագայթները ամենաերկար ալիքի ուլտրամանուշակագույն ճառագայթումն են, որը հասնում է Երկրի մակերեսին: Նրանք ներթափանցում են մաշկի խորքերը՝ հասնելով դերմիսի շերտին:",
                    uva3: "Չնայած UVA-ն քիչ էներգետիկ է, այն զգալիորեն նպաստում է մաշկի ծերացմանը և կնճիռներին: Այն նաև կարող է թուլացնել իմունային համակարգը և մեծացնել մաշկի քաղցկեղի առաջացման վտանգը:",
                    api_info: "Բարի գալուստ, ծրագրավորողներ: Եղանակի տվյալների մեր API-ը ձեզ հնարավորություն է տալիս օգտվել եղանակի մասին տեղեկատվությունից՝ հիմնված հատուկ պարամետրերի վրա: Հետևեք ստորև նշված հրահանգներին՝ այս API-ը ձեր հավելվածում ինտեգրելու համար:",
                    api_info_param: "Պարամետրեր:",
                    api_info_deviceId: " (Պարտադիր է): Սարքի եզակի նույնացուցիչ։",
                    api_info_startTime: " (Պարտադիր չէ)։ Եղանակի տվյալների որոնման մեկնարկի ամսաթիվը և ժամը։",
                    api_info_endTime: " (Պարտադիր չէ)։ Եղանակի տվյալների որոնման ավարտի ամսաթիվը և ժամը։",
                    api_info_format: "ֆորմատ։ ",
                    api_info_example: "Հարցման օրինակ.",
                    api_info_24: "Առբերել վերջին 24 ժամվա տվյալները.",
                    api_info_24_request: "Եթե օգտագործում եք հետևյալ հղումը՝ առանց նշելու",
                    and: "և",
                    api_info_24_request2: "Դուք կստանաք եղանակի տվյալները վերջին 24 ժամվա համար",
                    api_info_response: "Պատասխան.",
                    api_info_json: "API-ն վերադարձնում է եղանակի տվյալները JSON ձևաչափով, որը պարունակում է համապատասխան տեղեկատվություն՝ հիմնված տրամադրված պարամետրերի վրա:",
                    api_info_usage: "Օգտագործում:",
                    api_info_usage2: "GET հարցում կատարեք API-ի վերջնակետին",
                    api_info_usage3: " պարամետրերով ",
                    api_info_usage4: "Վերլուծեք JSON պատասխանը՝ եղանակի տվյալները հանելու համար",
                    api_info_usage5: "Անհրաժեշտության դեպքում օգտագործեք ձեր հավելվածում առբերված եղանակային տվյալները, ինչպես օրինակ՝ ցուցադրել դրանք օգտատերերին, կատարել վերլուծություն կամ ինտեգրել դրանք այլ ծառայությունների հետ:",
                    api_info_note: "Նշում:",
                    api_info_note2: "Համոզվեք, որ դուք նրբանկատորեն եք վերաբերվում սխալներին, ինչպիսիք են անվավեր պարամետրերը կամ ցանցի խնդիրները, ձեր օգտատերերի համար անթերի փորձ ապահովելու համար:",
                    api_info_note3: "Հետագա օգնության կամ հարցումների համար դիմեք մեր աջակցման թիմին՝ ",
                    api_info_note4: "Պիտակավորման պահանջ. Եղանակի տվյալների API-ն օգտագործելիս խնդրում ենք ներառել համապատասխան պիտակ՝ տվյալների աղբյուրը ճանաչելու համար: Օրինակ՝ ",
                    api_info_note5: "Եղանակի տվյալները տրամադրված են ԹՈՒՄՈ Լաբերի կողմից",
                    api_info_done: "Հաճելի կոդավորում)"
                },
                banner: {
                    title: 'Կլիմայական ցանց. Հայաստանի միացումը կլիմայական տվյալների աճող ցանցին իրական ժամանակում։',
                    text: {
                        1: 'Իրական ժամանակում հետևեք կլիմայի փոփոխություններին։',
                        2: 'Ջերմաստիճանի և խոնավության ճշգրիտ չափումներ։',
                        3: 'Իրական ժամանակում հետևեք կլիմայի փոփոխություններին Հայաստանի մարզերում։',
                    },
                },
                scrollableSection: {
                    section1: "Առաջատար հիպերտեղական, ուսանողների կողմից ղեկավարվող կլիմայական աստղադիտարան: Մեր առաքելությունն է հզորացնել հաջորդ սերնդին և բարձրացնել իրազեկությունը տվյալների իրական ժամանակում հետևելու միջոցով, այս ամենը միևնույն ժամանակ զգալի ներդրում ունենալով կլիմայի փոփոխությունը մեղմելու գործում։ Մենք նվիրված ենք պաշտպանելուն սահմաններից դուրս կլիմայական գործողությունների համար, քանի որ մեր առջև ծառացած մարտահրավերները գլոբալ բնույթ ունեն։",
                    section2: "Բացահայտեք եղանակի կանխատեսումների ուժը",
                    section3: "ԹՈՒՄՈ Լաբերի աջակցությամբ",
                    section4: "Ուսումնասիրեք կլիմայական տվյալները"
                },
                description: {
                    sections: [
                        {
                            title: "Կլիմայի ընկերներ։",
                            content: "Ծանոթացեք մեր գործընկերներին և ընկերներին, ովքեր աջակցել և շարունակում են մեզ աջակցել։",
                            partner1: "Amazon Web Services-ը մեզ տրամադրում է ամպային վարկեր, որոնք օգնում են մեզ պահել և կառավարել մեր տվյալները բարձր չափանիշներին համապատասխան։",
                            partner2: "ԹՈՒՄՈ տուփերը էժան և հեշտ տեղադրվող սարքեր են, որոնք կառուցված են բեռնափոխադրման տարաներից։ Այս ինքնավար ուսումնական կենտրոնները, որոնք ռազմավարականորեն տեղակայված են այնպես, որ Հայաստանի յուրաքանչյուր դեռահաս կարողանա դրանց հասնել 40 րոպեում կամ ավելի քիչ, հագեցած են ամենաժամանակակից աշխատատեղերով և սարքավորումներով և կարող են ընդունել շաբաթական մինչև 320 սովորող։ Այս տուփերը հնարավորություն են տալիս մուտք գործել ԹՈՒՄՈ ծրագիր և ամբողջ ցանց: Այս արբանյակային վայրերը հիմք են հանդիսանում Կլիմայական ցանցի սարքերի համար: Սարքերը տեղադրված են այդ տուփերի վրա ամբողջ երկրում, որպեսզի մեզ տրամադրեն տեղական և ճշգրիտ տվյալներ։"
                        },
                        {
                            title: "Ուսանողներ։",
                            content: "Ծանոթացեք ԹՈՒՄՈ Լաբերի պրակտիկանտներին ծրագրի ընթացքում։ Ծրագրի շրջանակներում յուրաքանչյուր 6 ամիսը մեկ իրականացվում է նոր մասնակիցների հավաքագրում։ Երեք ամիս տևած ինտենսիվ տեսական և գործնական սեմինարներից հետո կընտրվեն լավագույն ուսանողները, ովքեր կմիանան եզրափակիչ փուլին ՝ որպես պրակտիկանտ։ Պրակտիկայի ընթացքում ուսանողները կօգնեն սարքի հավաքմանը, տեղադրմանը և մոնիտորինգին:"
                        }
                    ]
                },
                teamMembers: {
                    2: {
                        name: "Հովհաննես",
                        position: "Ծրագրային ճարտարագետ"
                    },
                    3: {
                        name: "Մարինա",
                        position: "Backend ծրագրավորող"
                    },
                    4: {
                        name: "Արսեն",
                        position: "DevOps ճարտարագետ"
                    },
                    5: {
                        name: "Վահե",
                        position: "Frontend ծրագրավորող"
                    }
                },
                map: {
                    mapHeader: "Քարտեզ",
                    mapDescription: "Առանձնացված վայրերը մատնանշում են ներկայիս ակտիվ կլիմայական սարքերը։ Սեղմեք գտնվելու վայրին ՝ այդ սարքին վերաբերող տվյալների հավաքածու մուտք գործելու համար։",
                    clickOnMap: "Սեղմեք քարտեզի վրա՝ մեծացնելու կամ փոքրացնելու համար",
                },
                contact: {
                    title: "Կապ մեզ հետ",
                    formFields:
                        {
                            name: "Անուն",
                            surname: "Ազգանուն",
                            subject: "Թեմա",
                            email: "Էլ. հասցե",
                            message: "Հաղորդագրություն",
                            templateMessage: "Բարև ԹՈՒՄՈ Լաբերի թիմ,",
                            templateMessage2: "Հարգանքներով,",
                            submit: "Ուղարկել"
                        },
                    options: [
                        "Տվյալների հարցում",
                        "Միացում նախագծին",
                        "Տեխնիկական աջակցություն",
                        "Հետադարձ կապ"
                    ]
                },
                footer: {
                    title: "Հետևեք մեզ",
                    address: "Հայաստան, Երևան, Հալաբյան 2ա",
                    projects: {
                        upcomingProjects: "ԹՈՒՄՈ Լաբերի առաջիկա ծրագրերը",
                        pastProjects: "Անցյալ նախագծեր"
                    },
                    rightsReserved: " TUMO Labs. Բոլոր իրավունքները պաշտպանված են"
                },
                devices: {
                    deviceNames: {
                        Maralik: "Մարալիկ",
                        Panik: "Փանիկ",
                        Azatan: "Ազատան",
                        Artik: "Արթիկ",
                        "V. Sargsyan": "Վ. Սարգսյան"
                    },
                    parentNames: {
                        Shirak: "Շիրակ",
                        Yerevan: "Երևան"
                    }
                },
                header: {
                    navItems: {
                        home: "Գլխավոր",
                        about: "Մեր մասին",
                        map: "Քարտեզ",
                        devices: "Սարքեր",
                    },
                },
                linerStatusBar: {
                    airQualityTitle: "Օդի որակ (PM2.5)",
                    good: "Լավ",
                    moderate: "Չափավոր",
                    unhealthySensitiveGroups: "Անառողջ զգայուն խմբերի համար",
                    unhealthy: "Անառողջ",
                    veryUnhealthy: "Շատ Անառողջ",
                    hazardous: "Վտանգավոր",
                    feelsLike: "Զգացվում է ինչպես ",
                    recommendation: "Մեկնաբանությունների բաժին, այստեղ կարող են լինել որոշ առաջարկություններ",
                    wind: "Քամի",
                    humidity: "Խոնավություն",
                    barometricPressure: "Բարոմետրիկ Ճ.",
                    light: "Լույս",
                    uv_index: "UV",
                    rain: "Անձրև",
                    pm1: "PM 1",
                    pm10: "PM 10",
                    pm2_5: "PM 2.5",
                    lux: "Լյուքս",
                    hPa: "հՊա",
                    mm: "մմ",
                    myum: "μմ",
                    kmhour: "կմ/ժ",
                    micro: "միկրո"
                },
                nearbyDevicesItem: {
                    km: "կմ"
                },
                innerPageDynamicContent: {
                    tabTitles: {
                        temperatureAndHumidity: "Ջերմաստիճան և խոնավություն",
                        airQuality: "Օդի որակ",
                        pressure: "Ճնշում",
                        rainAndWind: "Անձրև և քամի"
                    },
                    temperature: "Ջերմաստիճան",
                    humidity: "Խոնավություն",
                    pressure: "Ճնշում",
                    rain: "Անձրև",
                    windSpeed: "Քամու արագություն",
                    windDirection: "Քամու ուղղություն"
                },
                innerPageFilter: {
                    options: {
                        hourly: "Ժամային",
                        daily: "7 Օր",
                        monthly: "Ընթացիկ ամիս",
                        range: "Միջակայք",
                        filter: "Ֆիլտր"
                    },
                },
                innerPageNearbyDevices: {
                    titles: {
                        devicesNearYou: "Մոտակա սարքեր",
                        devicesNear: "Մոտակա սարքեր"
                    },
                },
                innerPage: {
                    data: "Տվյալներ չեն գտնվել"
                },
                downloadButton: {
                    download: "Ներբեռնել ամբողջական տվյալները"
                },
                chartTitles: {
                    dataPer: "",
                    monthly: "Վերջին ամսվա տվյալներ",
                    daily: "Վերջին շաբաթվա տվյալներ",
                    hourly: "Վերջին 24 ժամվա տվյալներ",
                    range: "Նշված միջակայքի տվյալներ",
                    update: "Թարմացում..."
                },
                filterTooltips: {
                    filter: "ֆիլտր",
                    to: "ավարտ",
                    from: "սկիզբ",
                    oneM: "1 ամիս",
                    sevenD: "7 օր",
                    oneD: "1 օր"
                },
            },
        },
    }
;

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getLanguageFromPath(), // Set initial language based on URL path
        interpolation: {
            escapeValue: false,
        },
    });

// Function to determine language from the URL path
function getLanguageFromPath() {
    const path = window.location.pathname;
    const supportedLanguages = ['en', 'hy'];

    // Check if the path starts with a supported language code
    const language = supportedLanguages.find(lang => path.startsWith(`/${lang}`));

    return language || 'en'; // Default to English if no valid language found
}

export default i18n;
