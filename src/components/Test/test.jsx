import React from 'react';

const DropdownMenu = () => {
    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Menu
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#submenu1">
                    Submenu 1
                </a>
                <a className="dropdown-item" href="#submenu2">
                    Submenu 2
                </a>
                <a className="dropdown-item" href="#submenu3">
                    Submenu 3
                </a>
            </div>
        </div>    );
}

export default DropdownMenu;
