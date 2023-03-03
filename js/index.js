const fetchCategories = ()=>{
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res => res.json())
    .then(data => showCategories(data.data))
}
// fetchCategories()
const showCategories = data =>{
    // console.log(data)
    //capture catagorise container to append all the category links
    const catgoriesContainer = document.getElementById('catagories-container');
    data.news_category.forEach(singleCategory=>{
        // console.log(singleCategory)
        // catgoriesContainer.innerHTML += `<a class="nav-link" href="#">${singleCategory.category_name}</a>`

        //prottekta loop cholbe, akta kore p tag create korbe, tar vetore 1 ta kore anchor tag rakhbe,then catgoriesContainer e append korbe child hishebe, manee aktar niche arekta
        let linkContainer = document.createElement('p');
        linkContainer.innerHTML=`<a class="nav-link" href="#" onclick="fetchCategoryNews('${singleCategory.category_id}','${singleCategory.category_name}')">${singleCategory.category_name}</a>`
        catgoriesContainer.appendChild(linkContainer);
    })
}


//fetch all news available in a category
const fetchCategoryNews =  (category_id,category_name) =>{
    // console.log(category_id)
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showALLNews(data.data,category_name))

}
const showALLNews = (data,category_name) =>{
    // console.log(data, category_name);
    document.getElementById('news-count').innerText=data.length;
    document.getElementById('category-name').innerText=category_name;
    const newsContainer  = document.getElementById('all-news')
    newsContainer.innerHTML='';
    data.forEach(singleNews =>{
      //destructuring
      const {_id, image_url,title, details, author,total_view} = singleNews;



        const card = document.createElement('div')
        card.classList.add('card', 'mb-3');
        card.innerHTML = `
        <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${image_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8 d-flex flex-column">
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${details.slice(0,200)}.....</p>
                      </div>
                      
                    <div class="card-footer border-0 d-flex justify-content-between">
                    
                    <div class="d-flex gap-2">
                    <img src="${author.img}" class="img-fluid rounded-circle" alt="..." height="40" width="40">
                    <div>
                    <p class="m-0 p-0">${author.name} </p>
                    <p class="m-0 p-0">${author.published_date} </p>
                    </div>
                    </div>
                    
                    <div class="d-flex align-items-center">
                    <i class="fas fa-eye"></i>
                    <p class="m-0 p-0">${total_view}</p>
                    </div>
                    <div>
                    <i class="fas fa-arrow-right" onclick="fetchNewsDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </div>
                    
                  </div>
                  </div>
                </div>
        `;
        newsContainer.appendChild(card);
    } )
}
const fetchNewsDetails = news_id=>{
  let url = `https://openapi.programming-hero.com/api/news/${news_id}`
  fetch(url).then(res => res.json()).then(data=>showNewsDetails(data.data[0]))
  
}

const showNewsDetails  = newsDetails=>{
  console.log('ab',newsDetails)
  const {image_url,title, details, author,total_view,others_info} = newsDetails;
  document.getElementById('modal-body').innerHTML =`
        <div class="card mb-3">
        <div class="row g-0">
                  <div class="col-md-12">
                    <img src="${image_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8 d-flex flex-column">
                    <div class="card-body">
                      <h5 class="card-title">${title}<span class="badge text-bg-warning">${others_info.is_trending ? "Trending":"Not Trending"}</span></h5>
                      <p class="card-text">${details}.....</p>
                      </div>
                      
                    <div class="card-footer border-0 d-flex justify-content-between">
                    
                    <div class="d-flex gap-2">
                    <img src="${author.img}" class="img-fluid rounded-circle" alt="..." height="40" width="40">
                    <div>
                    <p class="m-0 p-0">${author.name} </p>
                    <p class="m-0 p-0">${author.published_date} </p>
                    </div>
                    </div>
                    
                    <div class="d-flex align-items-center">
                    <i class="fas fa-eye"></i>
                    <p class="m-0 p-0">${total_view ? total_view : "Not Available"}</p>
                    </div>
                    
                    
                  </div>
                  </div>
                </div>
        </div>
        `;
        

}


//  ||  -if left side false then right side will be executed
//  &&  -if left side true then right side will be executed
// (left||right)

// condition ? "execute for true" : "execute for false"