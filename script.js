let nav  = document.querySelector('nav');
// add box shadow to nav-bar
window.addEventListener('scroll',()=> {
    if(this.scrollY > 0) {
        nav.classList.add('active');
    }else {
        nav.classList.remove('active');
    }
});
// side bar manipulation
let sid_bar = document.querySelector('.bar .side-menu .left-section .logo');
let bar = document.querySelector('.bar');
sid_bar.addEventListener('click',()=> {
    bar.classList.add('close')
});
let menu = document.querySelector('.left-section .logo');
menu.addEventListener('click', ()=> {
    bar.classList.remove('close');
    bar.classList.add('open');
});
let videoContainer = document.querySelector('.content .container') ;

// youtube api
let api_key = "AIzaSyC4ELDab7_yuUZy9uu7OVf0JRAKeYiKZ5A";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key, 
    part: 'snippet', 
    chart:'mostPopular',
    maxResults:30,
    regionCode:'DZ'
})).then(res=>res.json())
    .then(data => {
        data.items.forEach(item => {getChannelIcon(item);})
    }).catch(err => console.log(err));
    const getChannelIcon = (video_data) => {
        fetch(channel_http + new URLSearchParams({
            key: api_key,
            part: 'snippet',
            id: video_data.snippet.channelId,
        })).then(res => res.json())
            .then(data => {
                video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
                makeVideoCard(video_data);
            })
    }
const makeVideoCard = (data) =>{
    videoContainer.innerHTML+=`
    <div class="box" onclick=" location.href = 'https://www.youtube.com/watch?v=${data.id}'">
            <img class="img" src="${data.snippet.thumbnails.high.url}" alt="">
            <div class="discrib">
                <img src="${data.channelThumbnail}" alt="" class="chanel">
                <p>${data.snippet.channelTitle}</p>
            </div>
    </div>
    `
};
const search = document.querySelector('#text');
const search_btn = document.querySelector('.search button .material-icons');
const bbt = document.querySelector('.mic');
// console.log(bbt)
let search_link = "https://www.youtube.com/results?search_query=?"
bbt.addEventListener('click', ()=>{
    if(search.value.length){
        location.href = search_link + search.value ;
    }
});
