import React, { useState } from "react";
import UserCookieForm from "../UserCookieForm/UserCookieForm";
import CookiePreferencesModal from "../CookiePreferencesModal/CookiePreferencesModal";

function CookieManager() {
    const [isPreferencesOpen, setPreferencesOpen] = useState(false);
    const [cookiePreferences, setCookiePreferences] = useState({
        analytics: false,
        marketing: false,
        functional: false
    });

    const handleAcceptCookies = () => {
        const allCookies = { analytics: true, marketing: true, functional: true };
        setCookiePreferences(allCookies);
        sendPreferencesToBackend(allCookies);
    };

    const handleOpenPreferences = () => {
        setPreferencesOpen(true);
    };

    const handleSavePreferences = (preferences) => {
        setCookiePreferences(preferences);
        sendPreferencesToBackend(preferences);
        setPreferencesOpen(false);
    };

    const sendPreferencesToBackend = (preferences) => {
        console.log(preferences)
        // fetch("/api/cookies/preferences", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(preferences),
        // })
        //     .then((response) => response.json())
        //     .then((data) => console.log("Preferences saved:", data))
        //     .catch((error) => console.error("Error saving preferences:", error));
    };

    return (
        <>
            <UserCookieForm
                onAccept={handleAcceptCookies}
                onPreferences={handleOpenPreferences}
            />
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