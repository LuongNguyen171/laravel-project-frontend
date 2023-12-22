import React from 'react';
import './style.css';

const SearchBar = ({ value, handleSearchKey, clearSearch, formSubmit }) => (
    <div className="searchbar-wrap">
        <form onSubmit={formSubmit}>
            <input
                type="text"
                onChange={handleSearchKey}
                placeholder="Nhập thể loại muốn tìm"
                value={value}
            />
            {value && <span onClick={clearSearch}>X</span>}
            <button>Tìm</button>
        </form>
    </div>
);

export default SearchBar;
