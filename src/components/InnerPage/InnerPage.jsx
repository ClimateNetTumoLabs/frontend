import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./InnerPage.module.css";
import InnerPageLeftNav from "../InnerPageLeftNav/InnerPageLeftNav";
import InnerPageContent from "../InnerPageContent/InnerPageContent";
import { PositionContext } from "../../context/PositionContext";

function InnerPage() {
	const params = useParams();
	const [weather_data, change_weather_data] = useState([]);
	const [filterState, filterStateChange] = useState('Hourly');
	const { permissionGranted, setPosition, setPermissionGranted } = useContext(PositionContext);
	const [startDateState, setStartDate] = useState(new Date());
	const [endDateState, setEndDate] = useState(new Date());
	const [error, setError] = useState(null);
	const [leftLoad, setLeftLoad] = useState(true);
	const [lastData, setLastData] = useState([]);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [filterPressed, setFilterPressed] = useState(false);

	const handleCloseDatePicker = () => {
		setShowDatePicker(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				axios
					.get(`/device_inner/${params.id}/latest/`)
					.then(res => {
						setLastData(res.data);
					})
			} catch (error) {
				console.error('Error fetching devices:', error);
			}
		};

		fetchData();
	}, [params.id]);

	useEffect(() => {
		if (!permissionGranted) {
			const askForPermissionAgain = () => {
				if ("geolocation" in navigator) {
					navigator.geolocation.getCurrentPosition(function (position) {
						setPosition({
							latitude: position.coords.latitude,
							longitude: position.coords.longitude,
						});
						setPermissionGranted(true);
					});
				} else {
					console.log("Geolocation is not available in your browser.");
				}
			};

			askForPermissionAgain();
		}
	}, [permissionGranted, setPosition, setPermissionGranted]);

	useEffect(() => {
		window.scrollTo(0, 0);
		const getDataUrl = (filterState) => {
			const currentDate = new Date();
			const currentMonth = currentDate.getMonth();
			const currentYear = currentDate.getFullYear();
			let start, end;

			switch (filterState) {
				case 'Daily':
					end = formatDate(currentDate);
					start = formatDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))
					break;
				case 'Monthly':
					start = formatDate(new Date(currentYear, currentMonth, 1));
					end = formatDate(new Date(currentYear, currentMonth + 1, 0) > currentDate ? currentDate : new Date(currentYear, currentMonth + 1, 0));
					break;
				case 'Hourly':
					return `/device_inner/${params.id}/24hours/`
				case 'Range':
					start = formatDate(startDateState);
					end = formatDate(endDateState);
					break;
				default:
					start = end = formatDate(currentDate);
					break;
			}

			return `/device_inner/${params.id}/period/?start_time_str=${start}&end_time_str=${end}`
		};
		const url = getDataUrl(filterState);
		axios
			.get(url, { withCredentials: true })
			.then((response) => {
				const normalizedData = response.data.filter(item => item !== null);
				setError("")
				change_weather_data(normalizedData);
				setLeftLoad(false)
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setLeftLoad(false)
				setError("Error")
			});
	}, [params.id, filterState, startDateState, endDateState]);

	const formatDate = (date) => {
		if (!(date instanceof Date) || isNaN(date)) {
			return "";
		}
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	if ((!weather_data || weather_data.length === 0)) {
		if (leftLoad === false) {
			return <div className={styles.not_data}>
				Data Not Found
			</div>;
		}
	}

	return (
		<div className={styles.inner_page}>
			<InnerPageLeftNav
				filterState={filterState}
				filterChange={filterStateChange}
				selected_device_id={params.id}
				startDate={startDateState}
				setStartDate={setStartDate}
				endDate={endDateState}
				setEndDate={setEndDate}
				error={error}
				showDatePicker={showDatePicker}
				setShowDatePicker={setShowDatePicker}
				handleCloseDatePicker={handleCloseDatePicker}
				setError={setError}
				weather_data={weather_data}
				leftLoad={leftLoad}
				setLeftLoad={setLeftLoad}
			/>
			<InnerPageContent
				weather_data={weather_data}
				error={error}
				leftLoad={leftLoad}
				setLeftLoad={setLeftLoad}
				filterChange={filterStateChange}
				startDate={startDateState}
				setStartDate={setStartDate}
				endDate={endDateState}
				setEndDate={setEndDate}
				setError={setError}
				data={lastData}
				filterState={filterState}
				selected_device_id={params.id}
				filterPressed ={filterPressed}
				setFilterPressed={setFilterPressed}
			/>
		</div>
	);
}

export default InnerPage;
