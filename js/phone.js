const loadPhone = async (searchText='13', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    // clear previus search data from phone container, before add new data
    phoneContainer.textContent = '';

    // display show all button if more then 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    }
    else{
      showAllContainer.classList.add('hidden');
    }

    // console.log(isShowAll);
    // display only first 12 phones if not "Show All"
    if(!isShowAll){
      phones = phones.slice(0, 12);
    }

        phones.forEach(phone =>{
            // console.log(phone);
            // create a div
            const phoneCard = document.createElement('div');
            phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
            phoneCard.innerHTML = `
            <figure>
              <img class="mt-4"
                src="${phone.image}"
                alt="phone"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>${phone.slug}</p>
              <span>${phone.brand}</span>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
            `;

            phoneContainer.appendChild(phoneCard);
        });

        // hide loading spinner
        toggleLoadingSpinner(false);
}

//
const handleShowDetails = async (id) =>{
  // console.log('clicked show details', id);
  // load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
  console.log(phone);
  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById('show-details-container');

  showDetailsContainer.innerHTML = `
  <img src="${phone.image}" alt="" />
  <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span>Display: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>Sensors: </span>${phone?.mainFeatures?.sensors}</p>
  <p><span>Bluetooth: </span>${phone?.others?.Bluetooth}</p>
  <p><span>USB: </span>${phone?.others?.USB || 'Info, Not Available'}</p>
  <p><span>GPS: </span>${phone?.others?.GPS || 'No GPS Available'}</p>
  `

  // show the modal
  show_details_modal.showModal();
}

// search field....
const searchHandler = (isShowAll) =>{
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
}


// search field 2

// const searchHandler2 = () =>{
//   toggleLoadingSpinner(true);
//   const searchField = document.getElementById('search-field2');
//   const searchText = searchField.value;
//   loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loaging-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}

// handle show all
const handleShowAll = () =>{
  searchHandler(true);
}

loadPhone();