useEffect(() => {
    const fetchData = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const datetimeCategories = props.time.map(time => new Date(time).getTime());
            const numTimestamps = datetimeCategories.length;

            // Calculate start and end dates based on available timestamps
            const startDate = datetimeCategories[0]; // Start from the first timestamp
            const endDate = datetimeCategories[numTimestamps - 1]; // End at the last timestamp

            // Calculate the interval between timestamps
            const interval = (endDate - startDate) / (numTimestamps - 1);

            // Adjust the range to display, for example, 10% before and after the actual data
            const range = Math.ceil(numTimestamps * 0.1);
            const startIndex = Math.max(0, Math.floor((numTimestamps - 1) / 2) - range);
            const endIndex = Math.min(numTimestamps - 1, Math.floor((numTimestamps - 1) / 2) + range);

            // Generate evenly spaced timestamps within the adjusted range
            const evenlySpacedTimestamps = [];
            for (let i = startIndex; i <= endIndex; i++) {
                evenlySpacedTimestamps.push(startDate + i * interval);
            }

            // Update chart state with evenly spaced timestamps
            setChartState(prevState => ({
                series: formatData(props.types, props.data),
                options: {
                    ...prevState.options,
                    title: {
                        text: `Data per ${props.timeline}`,
                        align: 'left'
                    },
                    xaxis: {
                        ...prevState.options.xaxis,
                        categories: evenlySpacedTimestamps,
                    },
                },
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            props.setLeftLoad(false);
            props.setLoading(false);
        }
    };
    fetchData();
}, [props.data, props.types, props.timeline, props.setLoading, props.time, props.id]);
