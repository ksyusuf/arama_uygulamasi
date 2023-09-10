const formWrapped = document.querySelector(".form-wrapper");
// classı bu olduğu için clasıını seçiyorum
const form = document.querySelector("#form");
// id si bu olduğu için id yi de böyle seçiyorum
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");

/// ilgili bileşenlerden içeriklerimizi çektik

runEventListeners();

function runEventListeners(){
    form.addEventListener("submit", search);
    // formu birisi submit ederse sen gidip search adındaki metodu çalıştır.
    clearButton.addEventListener("click", clear);
}


function search(e){
    const value = searchInput.value.trim();
    console.log(value);

    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        // @RequestParam - Spring - Rest API
        // buradaki ? servislerde requestParam olarak geçiyormuş
        // yani tahminimce ? yerine parametrde değeri geliyor.
        // value değerini gönderebilmek için `` bu tırnakları kullanmalıymışsın.
        // bunu da altGr + ; tuşları ile yapıyormuşsun.
        method : "get",
        headers : {
            Authorization : "Client-ID lI-dVZ8M90wNqATW5oCuBYUGh0SOtlNo57iGsNR-c6M "
            // ! servis saatlik 50 isteğe yanıt veriyor sadece
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        // veri buraya geliyor. burada yakalayıp işlemlerden geçirelim.
        // gelen verinin yapısını console log yaparak görebilirsin.
        // biz bu yapıyı gördük ve ona göre içeriden istediğimize ulaşıyoruz.
        Array.from(data.results).forEach((image)=>{
            /// console.log(image.urls.small);
            // bu url içerinden sadece small resimleri almayı seçiyorum
            // bu yapı program çalıkşıtığı sırada geldiği için api den,
            // kod sayfasında yazarken alt elemanları otomatik göremiyor.
            //tabii biz bunu konsola yazdırmayacağız. bunu ekrana yazdırmalıyız.
            resimleri_ekrana_yazdir(image.urls.small);
        })
    })
    .then((err)=>console.log(err));
    // apinin bana döndürdüğü veriyi then ler ile yakaladım.
    e.preventDefault();
}


function resimleri_ekrana_yazdir(url){    
    const div = document.createElement("div");
    div.className = "card";
    div.setAttribute("style", "text-align: center;");

    const img = document.createElement("img");
    img.setAttribute("src", url);
    // bunun olayı, oluşturduğumuz img taginin src özelliğine img verisini ver.
    // işin önemli kısmı burasıymış.    
    // şimdi eklenen resmin ölçülerini ayarlayalım.
    img.width = "400";

    // ve bu img etiketini oluşturduğumuz divin içine koyalım.
    div.append(img);
    // ve bu divi de ön taraftaki ana divin içine koyalım
    // bu ana divi biz bir değişkene almıştık. işlem yapabilmek için.

    // öncelikle ekranı bir temizleyelim
    while (imageListWrapper.firstChild) {
        imageListWrapper.removeChild(imageListWrapper.firstChild);
    }
    // ama ekran temizliğinden hgemen sonra görüntüler gelsin istiyorum    
    imageListWrapper.append(div);
}


function clear(){
    searchInput.value = "";
    while (imageListWrapper.firstChild) {
        imageListWrapper.removeChild(imageListWrapper.firstChild);
    }
}