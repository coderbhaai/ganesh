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