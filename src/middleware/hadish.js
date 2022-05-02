import Hashids from 'hashids';

export function onRandom(id) {
    var hashids = new Hashids('',1000,'abcdefghijklmnopqrstuvwxyz0987654321ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // no padding
    return hashids.encode(id); 
}

export function onBehind(id) {
    var hashids = new Hashids('',1000,'abcdefghijklmnopqrstuvwxyz0987654321ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // no padding
    return hashids.decode(id); 
}