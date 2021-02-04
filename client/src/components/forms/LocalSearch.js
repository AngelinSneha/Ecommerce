import React from 'react'

function LocalSearch({placeholder, setKeyword, keyword}) {
    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };
    return (
        <div class="bmd-form-group bmd-collapse-inline pull-xs-right">
                <button class="btn bmd-btn-icon" for="search" data-toggle="collapse" data-target="#collapse-search" aria-expanded="false" aria-controls="collapse-search">
                    <i class="material-icons">search</i>
                </button>  
                <span id="collapse-search" class="collapse">
                    <input class="form-control mb-4" type="text" id="search" placeholder={placeholder} value={keyword} onChange={handleSearchChange}  />
                </span>
        </div>
    )
}

export default LocalSearch
