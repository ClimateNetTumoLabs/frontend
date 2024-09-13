// i18n.js

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
        en: {
            translation: {
                about: {
                    welcome: "Welcome to Climate Net,",
                    titleTemp: "Temperature, Humidity and Pressure",
                    titleAir: "Air Pollution",
                    titleWind: "Air Speed, Direction and Rain",
                    titleUv: "UV Index and Light Intensity",
                    titleWeather: "Weather Data: API Documentation",
                    measureTemp: "Measuring Temperature",
                    measureHumidity: "Measuring Humidity",
                    measurePressure: "Measuring Pressure",
                    section1: " a pioneering hyper-local, student-led climate observatory. Our mission is to empower the next generation and raise awareness through real-time data tracking, all while making a significant contribution to mitigating climate change. We're dedicated to advocating for climate action beyond borders, because the challenges we face are global in nature.",
                    section2: "At Climate Net, we believe in the power of youth to drive meaningful change. We're putting the future in the hands of those who will be most affected by it: the young citizens inheriting the consequences of choices made by previous generations. We're here to equip and inspire them to take charge of tracking climate change patterns that will have the most significant impact on their lives and the world they'll inherit.",
                    section5: "TUMO Labs is a tuition-free education program based on the just-in-time methodology that connects higher-education with industry. Anyone over the age of 18 can participate in the program designed specifically for TUMO Labs. The TUMO Labs education program consists of guided self-learning, project-based learning, Tech Incubation, and ",
                    section3: "Climate Net project is empowered by",
                    section4: "TUMO Labs",
                    section6: "the 42 Yerevan",
                    section7: "programming school. These multi complementary methods enable students to acquire knowledge and practical skills in the fields of technology, applied science, and engineering. As a result, students are equipped with the competitive skills needed to succeed in a globally-connected job market and economy.",
                    temperatureContent: "The devices measure temperatures ranging from -40°C to 85°C.",
                    temperatureContent2: "Between the temperature range of 0 to 65°C, the accuracy is ±1.0°C; outside of that range, the accuracy drops to ±1.5°C.",
                    humidityContent: "The devices measure relative humidity between the range of 0 to 100% with an accuracy of ±3%.",
                    humidityContent2: "According to the Climate Net device sensor datasheet, the sensor can measure up to 100% humidity between the temperature range of 0 to 60°C. However, the maximum measurable humidity decreases at extremely high and low temperatures.",
                    pressureContent: "The devices measure pressure between 300Pa to 1100 hPa with an absolute accuracy of ±1 hPa.",
                    pressureContent2: "Full accuracy is obtained between the temperature range of 0 to 65°C, resulting in an altitude measurement accuracy of approximately ±1 meter. Outside of that range, the accuracy drops to 1.7 hPa.",
                    airQualityIntro: "The high-precision particulate matter (PM) sensor has a sensitivity of 50% for 0.3 μm particles and 98% for 0.5 μm and larger particles.",
                    airQualityIntro2: "It provides a resolution of 1 μg/m³ and operates in temperatures ranging from -10 °C to 60 °C.",
                    airQualityIntro3: "The sensor is designed to work effectively in humidity between 0% to 99%, making it suitable for diverse environmental conditions.",
                    pm1: "Particles this size are so small that they can bypass the body's natural defenses and penetrate deep into the lungs and bloodstream.",
                    pm1_2: "They can cause respiratory problems, heart disease, and even cancer.",
                    pm1_3: "Children and people with existing respiratory conditions are particularly vulnerable to the harmful effects of PM1.0.",
                    pm2: "Particles this size are also small enough to cause respiratory problems, but their larger size prevents them from reaching the deepest parts of the lungs.",
                    pm2_2: "However, they can still irritate the airways and trigger asthma attacks.",
                    pm2_3: "PM2.5 exposure has also been linked to an increased risk of cardiovascular disease.",
                    pm10: "Particles this size are larger and less likely to be inhaled deeply.",
                    pm10_2: "However, they can still irritate the eyes, nose, and throat.",
                    pm10_3: "Long-term exposure to PM10 can also lead to respiratory problems and heart disease.",
                    pmDanger: "PM Particle Danger Levels",
                    pmTh1: "Pollutant",
                    pmTh2: "Good",
                    pmTh3: "Moderate",
                    pmTh4: "Unhealthy for Sensitive Groups",
                    pmTh5: "Unhealthy",
                    pmTh6: "Very Unhealthy",
                    pmTh7: "Hazardous",
                    pmMu: "(μg/m³)",
                    titleWindSpeed: "Wind Speed",
                    windSpeed: "Climate Net devices measure wind speed through a rotating cup anemometer with magnets which passes by a stationary reed switch. As the wind blows faster, the cup spins faster, triggering the reed switch more frequently, allowing the system to calculate wind speed.",
                    windSpeed2: "The sensor on the device can measure wind speeds that range from 0.4 m/s to 45 m/s.",
                    titleWindDirection: "Wind Direction",
                    windDirection: "Wind direction is measured by a wind vane with a magnet which rotates based on the wind direction.",
                    windDirection2: "This triggers different reed switches positioned around the vane, allowing the system to determine the wind direction.",
                    titleRain: "Rainfall Quantity",
                    rain1: "The Climate Net device rain gauge operates on the tipping bucket principle, where rain is collected in a funnel and directed into a tipping bucket mechanism.",
                    rain2: "Each tip of the bucket corresponds to a known quantity of rainfall, typically 0.2mm, which then generates a pulse signal used to calculate the total rainfall.",
                    rain: {
                        rainfall: "Rainfall",
                        intensity: "Intensity (mm/hr)",
                        table: {
                            light: "Light",
                            moderate: "Moderate",
                            heavy: "Heavy",
                            intense: "Intense",
                            torrential: "Torrential",
                        },
                    },
                    uv_intro: "The Climate Net device UV Index sensor provides both ambient light and UV sensing with UV spectral responses from 280nm to 430nm and raw data output.",
                    uv_intro2: "It features high sensitivity, quick responses, and strong anti-interference ability. Here's an in-depth look:",
                    uva: "Wavelength 315-400nm",
                    uva2: "UVA rays are the longest-wavelength UV radiation reaching Earth's surface. They penetrate deep into the skin, reaching the dermis layer.",
                    uva3: "While UVA is less energetic, it contributes significantly to skin aging and wrinkles. It can also weaken the immune system and increase the risk of skin cancer",
                    tableuv: "UV Index",
                    uvth1: "Exposure Category",
                    uvth2: "UV Range",
                    uvlow: "Low",
                    uvmoderate: "Moderate",
                    uvhigh: "High",
                    uvveryhigh: "Very High",
                    uvextreme: "Extreme",
                    lux: "LUX",
                    lux1: "Light intensity, measured in lux, significantly impacts human health and well-being.",
                    lux2: "Low light levels (below 200 lux) can cause eye strain and fatigue, while moderate levels (around 500 lux) improve concentration and productivity.",
                    lux3: "High light levels (above 1,000 lux) can enhance mood and energy levels, but excessively bright light (over 10,000 lux) can cause discomfort and glare.",
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
                    title: 'Climate Net: Connecting Armenia through a growing network of real-time climate data.',
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
                            partner1: "Amazon Web Services provides us with cloud credits to help us store and manage our data with high standards. These cloud computing web services provide various services related to networking, computing, storage, middleware, IoT and other processing capacities, as well as software tools via AWS server farms. This frees clients from managing, scaling, and patching hardware and operating systems. ",
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
                    title1: "Contact Us",
                    title2: "Request Access",
                    formFields:
                        {
                            name: "Name",
                            surname: "Surname",
                            subject: "Subject",
                            email: "Email",
                            message: "Message",
                            templateMessage: "Hello TUMO Labs Team,",
                            templateMessage2: "Regards,",
                            submit: "Send",
                            coordinates: "Coordinates"
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
                diy: {
                    title1: "Build your own",
                    title2: "ClimateNet",
                    title3: "Device!",
                    tabs: {
                        home: "Home",
                        mat: "Materials",
                        tool: "Tools",
                        asm: "Assembly",
                        setup: "Setup Commands",
                        mattitle: "Bill of Materials",
                        tooltitle: "Tools",
                        asmtitle: "Videos of Assembling",
                        setuptitle: "Setup Commands"
                    },
                    intro: {
                        1: "Ready to make an impact?",
                        2: "Whether you're a tech enthusiast, a climate activist, or just curious, this guide is for you.",
                        3: "Start now and make a difference!",
                    },
                    info: {
                        title: "Here are a few things you should know before you start:",
                        point1: "ClimateNet Devices are comprised of hardware and software elements.",
                        point2: "We provide step-by-step instructions on how to build both components.",
                        point3: "You do not need to know how to code, just how to copy and paste!",
                        point4: "The materials will cost you an average of $130 to $280.",
                        end1: "Ready to start? Just fill out the ",
                        end2: " form, and we will send you all the necessary credentials via mail."
                    },

                    tools: {
                        item: "Item",
                        image: "Image",
                        1: "Drill Driver",
                        2: "Double Sided Tape",
                        3: "Bits (Step Drill Bit, Ph2 Bit, GP0205-850 Bit)",
                        4: "Soldering Iron",
                        5: "LAN Cable maker and wire stripper",
                        6: "Tape Measure",
                        7: "Scissors",
                        8: "Soldering Heat Gun",
                        9: "Stranded Wires(Red, Black, Green, Yellow/Blue)",
                        10: "Wire Cutter",
                        11: "Dupont Jumper Wire Cable Housing Male Pin(4 psc.) and Dupont connector (1x4)",
                        12: "Pliers",
                        13: "Rosin for Soldering",
                        14: "Plastic Spacer",
                        15: "Alcohol for Degreasing",
                        16: "Board Cleaning Brush, Any brush will work",
                        17: "Compass",
                        18: "Tweezers",
                        19: "Aquarium Silicone",
                        20: "Tester",
                        21: "Philips screwdriver",
                        22: "Solder Wire",
                        23: "Acrylic varnish for circuit boards",
                    },
                    materials: {
                        qnt: "Quantity",
                        info: "Info/Comment",
                        cost: "Cost",
                        item: {
                            1: "Waterproof case",
                            2: "Self-tapping screw",
                            3: "Linear Low Dropout Regulator",
                            4: "TJ8P8C (DS1125), Socket 8P8C (RJ45) on the corner  shielded board",
                            5: "TJ3-6P6C, RJ25 telephone socket for type 3 board /\n TJ3-6P6C, RJ-11 Connector to Board, 6P6C, Type 3",
                            8: "Uxcell 30Pcs 4mm Black Plastic Rivets Push Type Panel Retainer Fastener Clip",
                            9: "LAN Cable",
                            10: "Female Pins (1x4, 1x8, 1x20, 1x6)",
                            11: "SMD resistor",
                            15: "Case",
                            18: "Wind / Rain Sensor Assembly",
                            19: "PM2.5 Air Quality Sensor (PMS5003) and Breadboard Adapter Kit",
                            20: "Micro SD card",
                            21: "3.1 Inch Acrylic Transparent Indoor",
                            22: "Real Time Clock Module",
                            23: "Battery for RTC",
                            24: "Raspberry Pi 3 B+ Power Supply",
                        },
                        desc: {
                            2: "You can find it in any construction supply store 30mm",
                            5: "TJ3-6P6C, RJ-11 OR TJ3-6P6C, RJ25",
                            6: "Shipping Charge: $1.97, set the settings as default",
                            7: "Shipping Charge: $1.94, set the settings as default",
                            8: "4mm",
                            9: "Unique from Box, You should set the length depending on device's height",
                            10: "Includes Female Pin 1x4, 1x8, 1x20, and 1x6 in a single package.",
                            11: "Dimensions 0603, 10 kOhms",
                            12: "ADC Converter",
                            14: "Must be with Wi-Fi Module",
                            15: "Without sensors",
                            16: "Sensor of Temperature, Humidity and Pressure",
                            17: "UV index for visible spector",
                            18: "Rain, Wind Speed/Direction",
                            19: "Air Pollution",
                            20: "Needs to be 16 or 32 GBs, 16 is preferable and class needs to be A2 >",
                            21: "The diameter can not be less than 8 cm",
                            24: "Output: 5V DC / 2.5A Regulated Input: 100 - 240VAC",
                        }
                    },
                    commands: {
                        image: "First, you need to download the Raspberry Pi Imager. Choose the version that matches your operating system:",
                        win: "Download for Windows",
                        mac: "Download for MacOS",
                        ubun: "Download for Ubuntu",
                        inst1: "After downloading, Follow the on-screen instructions to complete the setup.",
                        inst2: "Put your SD card into the adapter and connect to your machine.",
                        inst3: "Open the RPI Imager and start configurations.",
                        important: "Important",
                        imager: {
                            rpi: " Select the Raspberry Pi 3 as your device.",
                            rpi1: " Select ",
                            rpi2: " from the available options in the Raspberry Pi Imager.",
                            storage1: " Select the SD card that you've inserted into the adapter.",
                            promt: "When prompted ",
                            choose: "Choose",
                            follow: " follow these steps:",
                            username: ' Set the username to raspberry.',
                            password: " Not required, but setting it will be secure.",
                            lan: " Enter your SSID and password to configure your Wi-Fi connection.",
                            services: " Enable the SSH connection by checking the corresponding box.",
                            difficult: "If you're facing difficulties, check out the",
                            video: "video",
                            wait: "Put SD card in Raspberry Pi, and wait for 5 minutes.",
                            local: "Make sure you are connected to the same network that you configured in the Imager.",
                            network: " After that, let's find your Raspberry Pi's IP address using a network scanning tool ",

                        },
                        install: "Installing arp-scan on:",
                        system: "systems",
                        brew: "If you don't have brew installed, check out ",
                        after_install: "After the installation, run:",
                        appear: "Your Raspberry Pi will appear in this format",
                        wrong: "If you haven't found your Raspberry Pi in your local network, reconfigure the Imager settings and double-check that you've entered the SSID and password correctly.",
                        correct: "But if you have, copy the IP address and run the command:",
                        congratulations: "Congratulations, now you are connected to Raspberry Pi. It's time to set up the app.",
                        setup: "Setting up the App",
                        app: {
                            vim: "Install vim on your Raspberry Pi",
                            edit: "Edit the ",
                            file: "file:",
                            line: "Add the following line at the end of the file:",
                            port: "Enable the serial port:",
                            navigate: "Navigate to ",
                            then: "then",
                            settings: " Configure the settings as follows:",
                            promt: "When prompted",
                            select: "Select",
                            dont: "Do not",
                            stage: "at this stage.",
                            workspace: "Create a workspace directory:",
                            clone: "Clone the repository:",
                            env: "Configure the environment variables: Copy .env_template to .env and update the values, including the",
                            message: "If you don't have the MQTT_BROKER_ENDPOINT or are unsure about the DEVICE_ID, go to the",
                            and: "and",
                            form: "and we will provide them.",
                            id: "Important: Do not change the DEVICE_ID; use the one we send you.",
                            wifi: "Add your WiFi credentials: Update the ",
                            certificates: "Copy the AWS IoT Core certificates: Copy the certificate files",
                            machine: "from your local machine into the ",
                            directory: "directory:",
                            include: "We included the certificates in the same message as the DEVICE_ID and MQTT_BROKER_ENDPOINT.",
                            script: "Run the installation script with sudo:",
                            system: "the system.",
                            test: "Test the functionality of the device: Put all the components together provided in the ",
                            venv: "Activate the virtual environment and run the testing script to ensure everything is working correctly:",
                            program: "Start the main program: Enable and start the ",
                            automate: " which will run continuously and start automatically on boot:",
                        }
                    }
                },
                guide: {
                    title: "Coming Soon",
                    title2: "Build Your Own Climate Monitoring Device",
                    intro1: "Welcome to our Device Guide! Learn how to create a climate monitoring device based on your needs and interests.",
                    intro2: "This guide is for environmental enthusiasts, farmers or anyone curious about climate.",
                    pointIntro: "What You'll Get",
                    rec: "Sensor Recommendations:",
                    measure: " Find sensors for measuring:",
                    temp: "Temperature, Humidity, and Pressure",
                    light: "UV Index and Light Intensity",
                    quality: "Air Pollution",
                    wind: "Wind Speed, Direction, and Rainfall",
                    price: {
                        title: "Pricing Information:",
                        text: " Get clear cost details to budget effectively",
                    },
                    instruction: {
                        title: "Instructional Videos:",
                        text: " Follow step-by-step tutorials for soldering, sensors gathering and assembling.",
                    },
                    integration: {
                        title: "Device Integration:",
                        text: " Connect your device to our platform to collect environmental data.",
                    },
                    future: "By building your own device, you will contribute to environmental awareness and action.",
                    benefit: {
                        title: "Benefits of Devices",
                        project: {
                            title: "For the Project:",
                            customization: "Customization: Adapt your device to specific monitoring needs.",
                            data: "Collecting climate data through the world."
                        },
                        user: {
                            title: "For you:",
                            learning: "Learn about electronics, programming, and environmental monitoring.",
                            cost: "Cost savings: Use affordable components.",
                            data: "Collect your data and contribute to climate monitoring."
                        }
                    },
                },
                devices: {
                    deviceNames: {
                        Maralik: "Maralik",
                        Panik: "Panik",
                        Azatan: "Azatan",
                        Artik: "Artik",
                        "V. Sargsyan": "V. Sargsyan",
                        Sevan: "Sevan",
                        Gavar: "Gavar",
                        Amasia: "Amasia",
                        Yerazgavors: "Yerazgavors",
                        Akhuryan: "Akhuryan",
                        Hatsik: "Hatsik",
                        Ashotsk: "Ashotsk",
                        TUMO: "TUMO",
                        Chambarak: "Chambarak",
                        Artsvaberd: "Artsvaberd",
                        Berd: "Berd",
                        Azatamut: "Azatamut",
                        Ijevan: "Ijevan",
                        Stepanavan: "Stepanavan",
                        Spitak: "Spitak",
                        Areni: "Areni",
                        Vayk: "Vayk",
                        Jermuk: "Jermuk",
                    },
                    parentNames: {
                        Shirak: "Shirak",
                        Yerevan: "Yerevan",
                        Gegharkunik: "Gegharkunik",
                        Tavush: "Tavush",
                        Lori: "Lori",
                        "Vayots Dzor": "Vayots Dzor",
                    }
                },
                header: {
                    navItems: {
                        home: "Home",
                        about: "About",
                        map: "Map",
                        devices: "Devices",
                        guide: "Guide",
                        diy: "DIY",
                    },
                },
                linerStatusBar: {
                    airQualityTitle: "Air Pollution (PM2.5)",
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
                    lux: "Lx",
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
                        airQuality: "Air Pollution",
                        pressure: "Pressure",
                        rainAndWind: "Rain and Wind",
                        light : "UV and Intensity"

                    },
                    temperature: "Temperature",
                    humidity: "Humidity",
                    pressure: "Pressure",
                    rain: "Rainfall Quantity",
                    windSpeed: "Wind Speed",
                    windDirection: "Wind Direction",
                    light_uv : "UV index",
                    light_intensity : "Light intensity"
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
                    oneW: "1 Week",
                    oneD: "1 Day"
                },
            },
        },

        hy: {
            translation: {
                about: {
                    welcome: "Բարի գալուստ Կլիմայական ցանց, ",
                    titleTemp: "Ջերմաստիճան, խոնավություն և ճնշում",
                    titleAir: "Օդի աղտոտվածություն",
                    titleWind: "Քամու արագություն, ուղղություն և անձրև",
                    titleUv: "UV ինդեքս և լույսի ինտենսիվություն",
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
                    pmDanger: "PM մասնիկների վտանգավորության մակարդակներ",
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
                    titleRain: "Անձրևի քանակ",
                    rain: {
                        rainfall: "Անձրև",
                        intensity: "Ուժգնություն (մմ/ժ)",
                        table: {
                            light: "Թեթև",
                            moderate: "Չափավոր",
                            heavy: "Հորդ",
                            intense: "Ինտենսիվ",
                            torrential: "Հեղեղային",
                        },
                    },
                    rain1: "Անձրևաչափը գործում է շրջվող դույլի սկզբունքով, որտեղ անձրևը հավաքվում է ձագարի մեջ և ուղղվում դեպի դույլի շրջման մեխանիզմը:",
                    rain2: "Դույլի յուրաքանչյուր ծայրը համապատասխանում է հայտնի տեղումների քանակին, սովորաբար 0,2 մմ, որն այնուհետև առաջացնում է իմպուլսային ազդանշան, որն օգտագործվում է տեղումների ընդհանուր քանակը հաշվարկելու համար:",
                    lux: "Լյուքս",
                    lux1: "Լույսի ինտենսիվությունը, որը չափվում է լյուքսով, զգալիորեն ազդում է մարդու առողջության և բարեկեցության վրա:  ",
                    lux2: "Լույսի ցածր մակարդակը (200 լյուքսից պակաս) կարող է առաջացնել աչքերի լարվածություն և հոգնածություն, մինչդեռ չափավոր մակարդակը (մոտ 500 լյուքս) բարելավում է կենտրոնացումը և արտադրողականությունը:",
                    lux3: "Լույսի բարձր մակարդակը (ավելի քան 1000 լյուքս) կարող է բարելավել տրամադրությունը և բարձրացնել էներգիայի մակարդակը, բայց չափազանց պայծառ լույսը (ավելի քան 10,000 լյուքս) կարող է անհանգստություն և կուրություն առաջացնել:",
                    uv_intro: "Climate Net սարքի ուլտրամանուշակագույն ինդեքսի սենսորը ապահովում է ինչպես շրջակա միջավայրի լույսի, այնպես էլ ուլտրամանուշակագույն ճառագայթման չափում՝ սպեկտրալ բնութագրերով 280-ից 430 նմ միջակայքում և չմշակված տվյալների արդյունքով:",
                    uv_intro2: "Այն ունի բարձր զգայունություն, արագ արձագանք և բարձր հակամիջամտություն: Ահա յուրաքանչյուրի մասին մանրամասներ.",
                    uva: "Ալիքի երկարություն 315-400 նմ",
                    uva2: "UVA ճառագայթները ամենաերկար ալիքի ուլտրամանուշակագույն ճառագայթումն են, որը հասնում է Երկրի մակերեսին: Նրանք ներթափանցում են մաշկի խորքերը՝ հասնելով դերմիսի շերտին:",
                    uva3: "Չնայած UVA-ն քիչ էներգետիկ է, այն զգալիորեն նպաստում է մաշկի ծերացմանը և կնճիռներին: Այն նաև կարող է թուլացնել իմունային համակարգը և մեծացնել մաշկի քաղցկեղի առաջացման վտանգը:",
                    tableuv: "UV ինդեքս",
                    uvth1: "Ազդեցության կատեգորիա",
                    uvth2: "UV միջակայք",
                    uvlow: "Թույլ",
                    uvmoderate: "Չափավոր",
                    uvhigh: "Բարձր",
                    uvveryhigh: "Շատ բարձր",
                    uvextreme: "Ծայրահեղ",
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
                            partner1: "Amazon Web Services-ը մեզ տրամադրում է ամպային վարկեր, որոնք օգնում են մեզ պահել և կառավարել մեր տվյալները բարձր չափանիշներին համապատասխան։ Ամպային հաշվարկի այս վեբ ծառայությունները տրամադրում են տարբեր ծառայություններ, որոնք կապված են ցանցերի, հաշվարկի, պահեստավորման, միջին շերտի ծրագրերի, IoT-ի և այլ մշակման հզորությունների հետ, ինչպես նաև ծրագրային գործիքներ՝ AWS սերվերային ֆերմաների միջոցով: Սա ազատում է հաճախորդներին սարքավորումների և օպերացիոն համակարգերի կառավարումից, մասշտաբավորումից և թարմացումից:",
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
                    title1: "Կապ մեզ հետ",
                    title2: "Մուտքի հարցում",
                    formFields:
                        {
                            name: "Անուն",
                            surname: "Ազգանուն",
                            subject: "Թեմա",
                            email: "Էլ. հասցե",
                            message: "Հաղորդագրություն",
                            templateMessage: "Բարև ԹՈՒՄՈ Լաբերի թիմ,",
                            templateMessage2: "Հարգանքներով,",
                            submit: "Ուղարկել",
                            coordinates: "Կոորդինատներ"
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
                diy: {
                    title1: "Կառուցեք ձեր սեփական",
                    title2: "ClimateNet",
                    title3: "սարքը",
                    tabs: {
                        home: "Գլխավոր",
                        mat: "Նյութեր",
                        tool: "Գործիքներ",
                        asm: "Հավաքում",
                        setup: "Կարգավորման հրահանգներ",
                        mattitle: "Նյութերի գնացուցակ",
                        tooltitle: "Գործիքներ",
                        asmtitle: "Հավաքման տեսանյութեր",
                        setuptitle: "Կարգավորման հրահանգներ"
                    },
                    intro: {
                        1: "Պատրա՞ստ եք ներդրում ունենալուն։",
                        2: "Անկախ նրանից, Դուք տեխնոլոգիայի էնտուզիաստ եք, կլիմայի ակտիվիստ թե պարզապես հետաքրքրասեր, այս ուղեցույցը ձեզ համար է:",
                        3: "Սկսեք հիմա և ունեցեք ներդրում։",
                    },
                    info: {
                        title: "Ահա մի քանի բան, որ դուք պետք է իմանաք նախքան սկսելը.",
                        point1: "Climate Net սարքերը բաղկացած են hardware և software բաղադրիչներից։",
                        point2: "Մենք տրամադրում ենք քայլ առ քայլ հրահանգներ երկու բաղադրիչների հավաքման համար։",
                        point3: "Ձեզ հարկավոր չէ իմանալ, թե ինչպես ծրագրավորել, պարզապես ինչպես պատճենել և տեղադրել:",
                        point4: "Նյութերի արժեքը միջինում կկազմի 130-ից 280 ԱՄՆ դոլար։",
                        end1: "Պատրա՞ստ եք սկսել: Պարզապես լրացրեք ",
                        end2: " ձևաչափը, և մենք էլեկտրոնային հասցեի միջոցով ձեզ կուղարկենք անհրաժեշտ փաստաթղթերը:"
                    },
                    tools: {
                        item: "Առարկա",
                        image: "Պատկեր",
                        1: "Էլեկտրական պտուտակահան",
                        2: "Երկկողմանի սկոտչ",
                        3: "Գայլիկոններ (Step Drill Bit, Ph2 Bit, GP0205-850 Bit)",
                        4: "Էլեկտրական զոդիչ",
                        5: "LAN մալուխի պատրաստիչ և մետաղալար կտրիչ",
                        6: "Մետր",
                        7: "Մկրատ",
                        8: "Էլեկտրական զոդման ատրճանակ",
                        9: "Թելավոր լարեր (Կարմիր, Սև, Կանաչ, Դեղին/Կապույտ)",
                        10: "Լար կտրիչ",
                        11: "Դյուպոնտ հարմարեցնող մալուխի պատյան (4 հատ) և Դյուպոնտ միակցիչ (1x4)",
                        12: "Հարթաշուրթ",
                        13: "Զոդման համար ռոսին",
                        14: "Պլաստմասե ընդարձակիչ",
                        15: "Ալկոհոլ յուղազերծման համար",
                        16: "Խոզանակ՝ սխեման մաքրելու համար, ցանկացած խոզանակ կհամապատասխանի",
                        17: "Կողմնացույց",
                        18: "Ունելի",
                        19: "Ակվարիումի սիլիկոն",
                        20: "Մուլտիմետր",
                        21: "Ֆիլիպս պտուտակահան",
                        22: "Զոդման մետաղալար",
                        23: "Ակրիլային լաք էլեկտրական սխեմաների համար"
                    },
                    materials: {
                        qnt: "Քանակ",
                        info: "Մեկնաբանություն",
                        cost: "Արժեք",
                        item: {
                            1: "Ջրակայուն պատյան",
                            2: "Պտուտակ (Սուր)",
                            3: "Գծային ցածր անկման կարգավորիչ",
                            4: "TJ8P8C (DS1125), 8P8C (RJ45) վարդակ անկյունային վահանակի վրա",
                            5: "TJ3-6P6C, RJ25 հեռախոսային վարդակ 3-րդ տիպի սխեմայի համար / TJ3-6P6C, RJ-11 միակցիչ վարդակ, 6P6C, 3-րդ տիպի",
                            8: "Uxcell 30 հատ 4մմ սև պլաստիկ խրոցներ՝ սեղմվող տեսակի պահարանների ամրակներ",
                            9: "LAN մալուխ",
                            10: "Female կոնտակտներ (1x4, 1x8, 1x20, 1x6)",
                            11: "SMD ռեզիստոր",
                            15: "Պատյան",
                            18: "Քամու/անձրևի սենսորների հավաքածու",
                            19: "PM2.5 օդի որակի սենսոր (PMS5003) և Breadboard ադապտեր",
                            20: "Միկրո SD քարտ",
                            21: "3.1 դյույմ ակրիլային թափանցիկ սարք",
                            22: "Real Time Clock մոդուլ",
                            23: "Մարտկոց RTC-ի համար",
                            24: "Raspberry Pi 3 B+ի սնուցում"
                        },
                        desc: {
                            2: "Այն կարող եք գտնել ցանկացած շինանյութի խանութում, 30մմ",
                            5: "TJ3-6P6C, RJ-11 կամ TJ3-6P6C, RJ25",
                            6: "Առաքման վճար: $1.97, կարգավորումները սահմանեք որպես լռելյայն",
                            7: "Առաքման վճար: $1.94, կարգավորումները սահմանեք որպես լռելյայն",
                            8: "4մմ",
                            9: "Երկարությունը կախված է սարքի բարձրությունից",
                            10: "Մի փաթեթում ներառում է 1x4, 1x8, 1x20 և 1x6 female կոնտակտներ",
                            11: "Չափեր 0603, 10 կՕհմ",
                            12: "ADC փոխարկիչ",
                            14: "Պետք է լինի Wi-Fi մոդուլով",
                            15: "Առանց սենսորների",
                            16: "Ջերմաստիճանի, խոնավության և ճնշման սենսոր",
                            17: "UV ինդեքս տեսանելի սպեկտրի համար",
                            18: "Անձրև, քամու արագություն/ուղղություն",
                            19: "Օդի աղտոտվածություն",
                            20: "Պետք է լինի 16 կամ 32 ԳԲ, ցանկալի է 16 և դասը պետք է լինի A2 >",
                            21: "Տրամագիծը չպետք է լինի 8 սմ-ից պակաս",
                            24: "Ելք: 5Վ DC / 2.5Ա կարգավորվող Մուտք: 100 - 240VAC"
                        }
                    },
                    commands: {
                        image: "Նախ, պետք է ներբեռնեք Raspberry Pi Imager-ը։ Ընտրեք այն տարբերակը, որը համապատասխանում է ձեր օպերացիոն համակարգին։",
                        win: "Ներբեռնել Windows-ի համար",
                        mac: "Ներբեռնել MacOS-ի համար",
                        ubun: "Ներբեռնել Ubuntu-ի համար",
                        inst1: "Ներբեռնումից հետո, հետևեք քայլերին՝ կարգավորումներն ավարտելու համար։",
                        inst2: "Տեղադրեք ձեր SD քարտը ադապտերի մեջ և միացրեք ձեր համակարգչին։",
                        inst3: "Բացեք RPI Imager-ը և սկսեք կարգավորումները։",
                        important: "Կարևոր է",
                        imager: {
                            rpi: " Ընտրեք Raspberry Pi 3-ը որպես ձեր սարք։",
                            rpi2: " հասանելի տարբերակներից Raspberry Pi Imager-ում։",
                            storage1: " Ընտրեք SD քարտը, որը տեղադրել եք ադապտերի մեջ։",
                            promt: "Երբ կհարցվի ",
                            choose: "Ընտրեք",
                            follow: " հետևեք այս քայլերին։",
                            username: ' Սահմանեք username-ը որպես raspberry։',
                            password: " Պարտադիր չէ, բայց սահմանելն ավելի անվտանգ է։",
                            lan: " Մուտքագրեք ձեր SSID-ն և գաղտնաբառը՝ Wi-Fi կապը կարգավորելու համար։",
                            services: " Միացրեք SSH կապը՝ ակտիվացնելով համապատասխան դաշտը։",
                            difficult: "Եթե ունեք դժվարություններ, անցեք",
                            video: "հղումով",
                            wait: "Տեղադրեք SD քարտը Raspberry Pi-ում և սպասեք 5 րոպե։",
                            local: "Համոզվեք, որ միացված եք այն նույն ցանցին, որը կարգավորել եք Imager-ում։",
                            network: " Այսքանից հետո կգտնենք ձեր Raspberry Pi-ի IP հասցեն ցանցի սկանավորման գործիքով՝ ",

                        },
                        install: "Ներբեռնենք arp-scan-ը",
                        system: "համակարգերի վրա",
                        brew: "Եթե դուք չունեք brew տեղադրված, անցեք ",
                        after_install: "Ներբեռնումից հետո, գործարկեք հրամանը.",
                        appear: "Ձեր Raspberry Pi-ը էկրանին կհայտնվի այս ձևաչափով",
                        wrong: "Եթե չեք գտել Ձեր Raspberry Pi-ը ներքին ցանցում, նորից կարգավորեք Imager-ի պարամետրերը և կրկնակի ստուգեք, որ ճիշտ եք մուտքագրել SSID-ն և գաղտնաբառը։",
                        correct: "Իսկ եթե գտել եք, պատճենեք IP հասցեն և գործարկեք հրամանը.",
                        congratulations: "Շնորհավորում ենք, այժմ դուք միացած եք Ձեր Raspberry Pi-ին, ժամանակն է կարգավորել հավելվածը։",
                        setup: "Հավելվածի կարգավորում",
                        app: {
                            vim: "Ներբեռնեք vim ձեր Raspberry Pi-ում։",
                            edit: "Խմբագրեք ",
                            file: "ֆայլը:",
                            line: "Ավելացրեք հետևյալ տողը ֆայլի վերջում։",
                            port: "Ակտիվացրեք Serial Port-ը:",
                            navigate: "Անցեք ",
                            then: "ապա",
                            settings: " Կարգավորեք պարամետրերը հետևյալ կերպ.",
                            promt: "Երբ կհարցվի",
                            select: "Ընտրեք",
                            dont: "Չընտրել",
                            stage: "այս փուլում.",
                            workspace: "Ստեղծեք workspace (աշխատանքային տարածք) պանակ:",
                            clone: "Կլոնավորեք repository-ն:",
                            env: "Կարգավորեք environment փոփոխականները: Պատճենեք .env_template-ը .env-ում և թարմացրեք արժեքները, ներառյալ",
                            message: "Եթե չունեք MQTT_BROKER_ENDPOINT կամ վստահ չեք DEVICE_ID-ի վերաբերյալ, անցեք",
                            and: "և",
                            form: "և մենք դրանք ձեզ կտրամադրենք.",
                            id: "Կարևոր է: Չփոխել DEVICE_ID-ն, օգտագործեք այն, որը մենք տրամադրել ենք։",
                            wifi: "Ավելացրեք ձեր Wi-Fi-ի պարամետրերը: Թարմացրեք",
                            certificates: "Պատճենեք AWS IoT Core-ի վկայագրերը: Պատճենեք վկայագրերի ֆայլերը",
                            machine: " ձեր տեղական համակարգչից ",
                            directory: "պանակի մեջ:",
                            include: "Մենք ներառել ենք վկայագրերը DEVICE_ID-ի և MQTT_BROKER_ENDPOINT-ի հետ միասին, նույն հաղորդագրության մեջ։",
                            script: "Գործարկեք տեղադրման հրամանները sudo-ի միջոցով:",
                            system: " արեք համակարգը։",
                            test: "Սարքի ֆունկցիոնալության ստուգում: Հավաքեք բոլոր մասերը՝ տրամադրված",
                            venv: "Ակտիվացրեք վիրտուալ միջավայրը և գործարկեք թեստային ֆայլը՝ համոզվելու համար, որ ամեն ինչ ճիշտ է աշխատում։",
                            program: "Գլխավոր ծրագրի գործարկում: Միացրեք և գործարկեք ",
                            automate: " որը շարունակաբար կաշխատի և ավտոմատ կերպով կգործարկվի միացման ժամանակ:",
                        }
                    }

                },

                guide: {
                    title: "Շուտով",
                    title2: "Կառուցեք կլիմայի մոնիտորինգի Ձեր սարքը",
                    intro1: "Բարի գալուստ մեր սարքի ուղեցույց: Հետևելով մեր ուղեցույցին՝ կիմանաք թե ինչպես ստեղծել կլիմայի մոնիտորինգի սարք, որը համապատասխանում է Ձեր կարիքներին և հետաքրքրություններին:",
                    intro2: "Այս ուղեցույցը նախատեսված է շրջակա միջավայրի սիրահարների, գյուղատնտեսների և բոլոր նրանց համար, ովքեր հետաքրքրված են կլիմայով:",
                    pointIntro: "Ինչ կստանաք",
                    rec: "Սենսորների առաջարկություններ - ",
                    measure: "Սենսորներ չափելու՝ ",
                    temp: "Ջերմաստիճան, խոնավություն և ճնշում",
                    light: "Ուլտրամանուշակագույն ճառագայթների հոսք և լուսավորության ինտենսիվություն",
                    quality: "Օդի աղտոտվածություն",
                    wind: "Քամու արագություն, ուղղություն և տեղումների քանակ",
                    price: {
                        title: "Գնային տեղեկատվություն - ",
                        text: "մանրամասն տեղեկություններ ծախսերի վերաբերյալ ՝ բյուջեն արդյունավետ պլանավորելու համար:",
                    },
                    instruction: {
                        title: "Ուսուցողական տեսանյութեր - ",
                        text: "սենսորների, սարքի հավաքման, զոդման և մի շարք այլ գործողությունների քայլ առ քայլ ուղեցույց:",
                    },
                    integration: {
                        title: "Սարքի ինտեգրում - ",
                        text: "Ձեր սարքի միացումը շրջակա միջավայրի տվյալների հավաքագրման մեր հարթակին:",
                    },
                    future: "Ստեղծելով ձեր սեփական սարքը ՝ դուք կնպաստեք շրջակա միջավայրի մասին իրազեկվածության բարձրացմանը:",
                    benefit: {
                        title: "Սարքերի առավելությունները",
                        project: {
                            title: "Նախագծի համար ",
                            customization: "Անհատականացում - սարքի հարմարեցում մոնիտորինգի հատուկ պայմաններին:",
                            data: "Կլիմայական տվյալների հավաքագրում ամբողջ աշխարհում:"
                        },
                        user: {
                            title: "Ձեզ համար ",
                            learning: "Իմացեք ավելին էլեկտրոնիկայի, ծրագրավորման և շրջակա միջավայրի մոնիտորինգի մասին:",
                            cost: "Ծախսերի խնայողություն - առկա բաղադրիչների օգտագործում:",
                            data: "Հավաքագրեք Ձեր տվյալները և նպաստեք կլիմայի մոնիտորինգին:"
                        }
                    },
                },
                devices: {
                    deviceNames: {
                        Maralik: "Մարալիկ",
                        Panik: "Փանիկ",
                        Azatan: "Ազատան",
                        Artik: "Արթիկ",
                        "V. Sargsyan": "Վ. Սարգսյան",
                        Sevan: "Սևան",
                        Gavar: "Գավառ",
                        Amasia: "Ամասիա",
                        Yerazgavors: "Երազգավորս",
                        Akhuryan: "Ախուրյան",
                        Hatsik: "Հացիկ",
                        Ashotsk: "Աշոցք",
                        TUMO: "ԹՈՒՄՈ",
                        Chambarak: "Ճամբարակ",
                        Artsvaberd: "Արծվաբերդ",
                        Berd: "Բերդ",
                        Azatamut: "Ազատամուտ",
                        Ijevan: "Իջևան",
                        Stepanavan: "Ստեփանավան",
                        Spitak: "Սպիտակ",
                        Areni: "Արենի",
                        Vayk: "Վայք",
                        Jermuk: "Ջերմուկ",
                    },
                    parentNames: {
                        Gegharkunik: "Գեղարքունիք",
                        Shirak: "Շիրակ",
                        Yerevan: "Երևան",
                        Tavush: "Տավուշ",
                        Lori: "Լոռի",
                        "Vayots Dzor": "Վայոց ձոր",
                    }
                },
                header: {
                    navItems: {
                        home: "Գլխավոր",
                        about: "Մեր մասին",
                        map: "Քարտեզ",
                        devices: "Սարքեր",
                        guide: "Ուղեցույց",
                        diy: "Ուղեցույց",
                    },
                },
                linerStatusBar: {
                    airQualityTitle: "Օդի աղտոտվածություն (PM2.5)",
                    good: "Լավ",
                    moderate: "Չափավոր",
                    unhealthySensitiveGroups: "Անառողջ զգայուն խմբերի համար",
                    unhealthy: "Անառողջ",
                    veryUnhealthy: "Շատ Անառողջ",
                    hazardous: "Վտանգավոր",
                    feelsLike: "Զգացվում է ինչպես ",
                    recommendation1: "Մեկնաբանությունների բաժին, այստեղ կարող են լինել որոշ առաջարկություններ",
                    wind: "Քամի",
                    humidity: "Խոնավություն",
                    barometricPressure: "Բարոմետրիկ Ճ.",
                    light: "Լույս",
                    uv_index: "UV",
                    rain: "Անձրև",
                    pm1: "PM 1",
                    pm10: "PM 10",
                    pm2_5: "PM 2.5",
                    lux: "Լք",
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
                        airQuality: "Օդի աղտոտվածություն",
                        pressure: "Ճնշում",
                        rainAndWind: "Անձրև և քամի",
                        light : "UV և լույսի ինտենսիվություն"
                    },
                    temperature: "Ջերմաստիճան",
                    humidity: "Խոնավություն",
                    pressure: "Ճնշում",
                    rain: "Անձրևի քանակ",
                    windSpeed: "Քամու արագություն",
                    windDirection: "Քամու ուղղություն",
                    light_uv : "UV ինդեքս",
                    light_intensity : "Լույսի ինտենսիվություն"
                },
                innerPageFilter: {
                    options: {
                        hourly: "Ժամային",
                        daily: "1 շաբաթ",
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
                    oneW: "1 շաբաթ",
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
