import React, { useState, useEffect } from "react";
import UserCookieForm from "../UserCookieForm/UserCookieForm";
import CookiePreferencesModal from "../CookiePreferencesModal/CookiePreferencesModal";

function CookieManager() {
    const [isPreferencesOpen, setPreferencesOpen] = useState(false);
    const [cookiePreferences, setCookiePreferences] = useState({
        name: false,
        email: false,
        phone: false,
        location: false,
        address: false,
    });

    const [showBanner, setShowBanner] = useState(false); // Initially hidden

    useEffect(() => {
        // Load preferences from localStorage if available
        const savedPreferences = localStorage.getItem("cookiePreferences");
        if (!savedPreferences) {
            setShowBanner(true); // Show the banner if no preferences are saved
        }
    }, []);

    const savePreferencesToLocalStorage = (preferences) => {
        localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    };

    const handleAcceptCookies = () => {
        const allCookies = {
            name: true,
            email: true,
            phone: true,
            location: true,
            address: true,
        };
        setCookiePreferences(allCookies);
        savePreferencesToLocalStorage(allCookies);
        setShowBanner(false); // Hide the banner
    };

    const handleOpenPreferences = () => {
        setPreferencesOpen(true);
    };

    const validatePreferences = (preferences) => {
        const requiredProperties = ["name", "email", "phone", "location", "address"];
        return requiredProperties.every((prop) => prop in preferences && typeof preferences[prop] === "boolean");
    };

    const handleSavePreferences = (preferences) => {
        if (validatePreferences(preferences)) {
            setCookiePreferences(preferences);
            savePreferencesToLocalStorage(preferences);
            setPreferencesOpen(false);
            setShowBanner(false); // Hide the banner
        } else {
            console.error("Invalid preferences object:", preferences);
        }
    };

    return (
        <>
            <div className={`d-flex ${showBanner ? "" : "d-none"}`}>
                <UserCookieForm
                    onAccept={handleAcceptCookies}
                    onPreferences={handleOpenPreferences}
                />
            </div>

            <CookiePreferencesModal
                isOpen={isPreferencesOpen}
                onClose={() => setPreferencesOpen(false)}
                onSave={handleSavePreferences}
                preferences={cookiePreferences}
            />
        </>
    );
}

export default CookieManager;