//TODO:make  scroll button  that takes you to the url shortner
const hamburger = document.querySelector('.hamburger');
const menuOpen = document.querySelector('.menu-open');
const menuClose = document.querySelector('.menu-close');
const heroImg = document.querySelector('.hero-illustration');
const dropDown = document.querySelector('.Drop-Down-Menu')
const UrlInput = document.querySelector(".UrlInput");
const Submit = document.querySelector(".btnShorten");
const loader = document.querySelector(".loading");
const LinksWrapper = document.querySelector('.LinksWrapper');

let btnID = 0;


hamburger.addEventListener('click', () => {
    menuOpen.classList.toggle('hidden');
    menuClose.classList.toggle('hidden');
    heroImg.classList.toggle('invisible');
    dropDown.classList.toggle('visible');
})








//Added an event listener that handles enter key press too
UrlInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        Submit.click();
    }
})

Submit.addEventListener("click", async () => {
	let originalURL = UrlInput.value;
	UrlInput.value = "";
    loader.classList.remove('hidden');

    // All this code is fetching some stupid apis 
	// Some stupid Shit, idk:
	const encodedParams = new URLSearchParams();
	encodedParams.append("url", originalURL);

    // Giving the data to the API:
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			"X-RapidAPI-Key":
				"a596d34f9emsh1da97db83509b5dp1e2d23jsn3994c14bbcad",
			"X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
		},
		body: encodedParams,
	};

    // Getting data from the API: 
	let data = await fetch("https://url-shortener-service.p.rapidapi.com/shorten",options);
	let response = await data.json();
	let shortURL = response.result_url ;
    if (shortURL === undefined) {
        alert("Kindly re enter the URL in full form")
        return
    }
    
    // calling the function that makes LinkBoxes on demand:
    MakeLinkBox(originalURL, shortURL);
    loader.classList.add('hidden');
    // Making the copy btn work:

    let btnCopy = document.getElementById(btnID);
    btnCopy.addEventListener('click', (e) => {
        let btn = e.target;
        btn.innerText = 'copied';;
        btn.classList.add('copied');
        navigator.clipboard.writeText(shortURL);
    });
    
    // inc to move onto the next element 
    btnID ++ ;
    
});


function MakeLinkBox(originalURL, shortURL) {
    // Making the div/divs with the short link inside of them:

    // Made the Wrapper
    let linkBox = document.createElement('div');
    linkBox.classList.add('flexCentre', 'LinkBox');
    
    // Making an anchor tag for the orignal url 
    let orgUrlAnchor = document.createElement('a');
    orgUrlAnchor.classList.add('orignalLink');
    orgUrlAnchor.innerText = originalURL;
    orgUrlAnchor.href = originalURL;
    
    
    // Making a shorlink and copy button wrappper:
    let shortLinkWrapper = document.createElement('div');
    shortLinkWrapper.classList.add('shortLinkWrapper');
    
    // Making an anchor tag for the shortened link and a button to copy:
    let shortLink = document.createElement('a');
    shortLink.classList.add('shortLink');
    shortLink.innerText = shortURL;
    shortLink.href = shortURL;
    
    let btnCopy = document.createElement('button');
    btnCopy.classList.add('btn', 'btnlow', 'btnCopy');
    btnCopy.id = btnID; // adding to target each id
    console.log(btnCopy.id);
    btnCopy.innerText = "Copy";
    

    // Appending everything where it is supposed to be:
    LinksWrapper.appendChild(linkBox);
    linkBox.appendChild(orgUrlAnchor);
    linkBox.appendChild(shortLinkWrapper);
    shortLinkWrapper.appendChild(shortLink);
    shortLinkWrapper.appendChild(btnCopy);

    

    // *How its supposed to look like:
    // <div class="LinkBox flexCentre">
    //     <a
    //         href="https://www.frontendmentor.io?ref=challenge"
    //         class="orignalLink"
    //         >https://www.frontendmentor.io?ref=challenge</a
    //     >

    //     <div class="shortLinkWrapper">
    //         <a href="" class="shortLink"
    //             >https://rel.link/k4sfefe</a
    //         >
    //         <button type="button" class="btn btnlow btnCopy">
    //             Copy
    //         </button>
    //     </div>
    // </div> 
}

