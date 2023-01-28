/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Sunny Student ID: 128365210 Date: 28-01-2023
*
********************************************************************************/
var page = 1;
var perPage = 10

function loadMovieData(title = null) {
    let url = title ? `https://beautiful-zipper-colt.cyclic.app/api/movies?page=${page}&perPage=${perPage}&title=${title}` : `https://beautiful-zipper-colt.cyclic.app/api/movies?page=${page}&perPage=${perPage}`;
    fetch(url).then(res => res.json()).then(data => {
        let postRows = `
                    ${data?.movies?.map(post => (
            `<tr data-id=${post._id}><td>${post.year}</td><td>${post.title}</td><td>${post.plot}</td><td>${post?.tomatoes?.viewer?.rating}</td><td>${post.runtime}</td></tr>`
        )).join('')}
                    `;
        document.querySelector('#moviesTable tbody').innerHTML = postRows;
        // add the "click" event listener to the newly created rows
        document.querySelectorAll('#moviesTable tbody tr').forEach(row => {
            row.addEventListener("click", e => {
                let clickedId = row.getAttribute("data-id");
                console.log(clickedId);
                fetch(`https://beautiful-zipper-colt.cyclic.app/api/movies/${clickedId}`)
                    .then(res => res.json()).
                    then(data => {
                        console.log("data", data?.movie);
                        document.querySelector("#detailsModal .modal-title").innerHTML = data?.movie?.title;
                        let body = `${data?.movie?.poster ?
                            `<div>
                                <img class="img-fluid w-100" src=${data?.movie?.poster} />
                            </div>` : ""
                            }                        
                            <div>
                            <strong>Directed By:</strong>  <span>${data?.movie?.directors}</span>
                            </div>
                            <div>
                            <span>${data?.movie?.fullplot}</span>
                            <br>
                            <strong>Cast:</strong>  <span>${data?.movie?.cast}</span><br><br>
                            <strong>Awards:</strong> <span>${data?.movie?.awards?.text}</span><br>
                            <strong>IMDB Rating:</strong> ${data?.movie?.imdb?.rating} (${data?.movie?.imdb?.votes} votes)
                            </div>
                        `;
                        document.querySelector("#detailsModal .modal-body").innerHTML = body;

                        let modal = new bootstrap.Modal(document.getElementById("detailsModal"), {
                            backdrop: "static",
                            keyboard: false
                        });
                        modal.show();
                    });
            });
        });
        document.querySelector('#current-page').innerHTML = page;
    });
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector("#previous-page").addEventListener('click', event => {
        if (page > 1) {
            page = page - 1
            loadMovieData(document.querySelector('#title').value);
            document.querySelector('#current-page').innerHTML = page;
        }
    });
    document.querySelector("#next-page").addEventListener('click', event => {
        page = page + 1
        loadMovieData(document.querySelector('#title').value);
        document.querySelector('#current-page').innerHTML = page;
    });
    loadMovieData();
    document.querySelector("#searchForm").addEventListener('submit', event => {
        event.preventDefault();
        page = 1
        loadMovieData(document.querySelector("#title").value);
        document.querySelector('#current-page').innerHTML = page;
    });
    document.querySelector("#searchForm").addEventListener('reset', event => {
        event.preventDefault();
        document.querySelector('#title').value = "";
        loadMovieData();
        document.querySelector('#current-page').innerHTML = page;
    });
});
