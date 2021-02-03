export function callSwal(mesg){ swal({ title: mesg, timer: 4000 }) }

export function checkDuplicate(array){
    return new Promise((resolve, reject) => {
        const dup = array.reduce( (i, index) => { 
            i.items[index] = i.items[index] ? i.items[index] += 1 : 1
            if (i.items[index] === 2) i.dup.push(index)
            return i
            }
            , { 
              items: {},
              dup: []
            },
          )
        resolve(dup)
        return;
    });
}

export function setMinNum(e){
    return new Promise((resolve, reject) => {
        if(e.target.max){
            let { value, min, max } = e.target;
            var data = Math.max( Number(min), Math.min(Number(max), Number(value)));
        }else{
            let { value, min } = e.target;
            var data = Math.max( Number(min), Number(value) );
        }
        resolve(data)
        return;
    })
}

export function sortArray(array, sortBy, type, direction){
    return new Promise((resolve, reject) => {
        
        if(type == 'text'){
            if(direction == 'Up'){
                array.sort(function(a, b) {
                    if(a.store.toLowerCase() < b.store.toLowerCase()) return -1;
                    if(a.store.toLowerCase() > b.store.toLowerCase()) return 1;
                    return 0;
                })
            }else{
                array.sort(function(a, b) {
                    if(a.store.toLowerCase() < b.store.toLowerCase()) return 1;
                    if(a.store.toLowerCase() > b.store.toLowerCase()) return -1;
                    return 0;
                })
            }
        }
        if(type == 'number'){
            const xx = sortBy
            if(direction == 'Up'){
                array.sort(function(a, b) { if (a.xx > b.xx) return 1; if (b.xx > a.xx) return -1; return 0; })
            }else{
                array.sort(function(a, b) { if (a.xx > b.xx) return -1; if (b.xx > a.xx) return 1; return 0; })
            }
        }
        resolve(array)
        return;
    })
}

export function printError(mesg){ console.log('mesg', mesg) }

export const params = {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    // autoplay: { delay: 3000 },
    breakpoints: {
        440: { slidesPerView: 2, spaceBetween: 20, },
        768: { slidesPerView: 3, spaceBetween: 20, },
        1400: { slidesPerView: 6, spaceBetween: 30, },
    },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
}

export const params2 = {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    // autoplay: { delay: 3000 },
    breakpoints: {
        767: { slidesPerView: 2 },
        1400: { slidesPerView: 2, spaceBetween: 10, },
    },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
}

export const testis = [
    {name: 'Amit Singhal', image: '1.jpg', text: 'I simply loved the service and products. Parents and Family is extremely impressed. They have never seen such a degree of professional in such ceremonies.'},
    {name: 'Somil Agrawal', image: '3.jpg', text: 'Great service! Easy to connect and extremely knowledgeable team! Have had multiple pooja done at my home over the years but this one by far was the most detailed and innovative in terms of new methods of rituals!'},
    {name: 'Parminder Bedi', image: 'female.svg', text: 'Marvelous site!!!!!!!!!!Especially for those who believe in ceremonies and all things formal.'},
    {name: 'Shantanu Chauhan', image: '4.jpg', text: 'I needed a Pooja at my home on my sons 9th Birthday. I booked the same through Pujarambh. They sent a Pandit ji who was not only courteous but also well-educated and having deep knowledge of Sanskars.'},
    {name: 'Dinesh Yalavarthy', image: '2.jpg', text: 'Amazing attention to detail and understanding of the requirements.. both you know of and don"t know of.Timely delivery of the samagri and unbelievable on the spot support for last minute needs.'},
    {name: 'Neetu Saluja', image: 'female.svg', text: 'Thanks Mr Jain! you are doing a great work. It was our pleasure to have been able to use the services. Very well organised, highly professional yet authentic, hassle free... it was a good experience. Much appreciated'},
]