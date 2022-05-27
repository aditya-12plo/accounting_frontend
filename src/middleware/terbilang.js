export function terbilang(a) {
	var bilangan    = ['','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan','Sepuluh','Sebelas'];
	var kalimat     = "";
	var utama       = 0;
	var depan       = 0;
	var belakang    = 0;
    if(a < 12){
        kalimat = bilangan[a]
    }else if(a < 20){
        kalimat = bilangan[a-10]+' Belas';
    }else if(a < 100){
        utama = a/10;
        depan = parseInt(String(utama).substr(0,1));
		belakang = a%10;
		kalimat = bilangan[depan]+' Puluh '+bilangan[belakang];
    }else if(a < 200){
		kalimat = 'Seratus '+ terbilang(a - 100);
	}else if(a < 1000){
		utama = a/100;
		depan = parseInt(String(utama).substr(0,1));
		belakang = a%100;
		kalimat = bilangan[depan] + ' Ratus '+ terbilang(belakang);
	}else if(a < 2000){
		kalimat = 'Seribu '+ terbilang(a - 1000);
	}else if(a < 10000){
		utama = a/1000;
		depan = parseInt(String(utama).substr(0,1));
		belakang = a%1000;
		kalimat = bilangan[depan] + ' Ribu '+ terbilang(belakang);
	}else if(a < 100000){
		utama = a/100;
		depan = parseInt(String(utama).substr(0,2));
		belakang = a%1000;
		kalimat = terbilang(depan) + ' Ribu '+ terbilang(belakang);
	}else if(a < 1000000){
		utama = a/1000;
		depan = parseInt(String(utama).substr(0,3));
		belakang = a%1000;
		kalimat = terbilang(depan) + ' Ribu '+ terbilang(belakang);
	}else if(a < 100000000){
		utama = a/1000000;
		depan = parseInt(String(utama).substr(0,4));
		belakang = a%1000000;
		kalimat = terbilang(depan) + ' Juta '+ terbilang(belakang);
	}else if(a < 1000000000){
		utama = a/1000000;
		depan = parseInt(String(utama).substr(0,4));
		belakang = a%1000000;
		kalimat = terbilang(depan) + ' Juta '+ terbilang(belakang);
	}else if(a < 10000000000){
		utama = a/1000000000;
		depan = parseInt(String(utama).substr(0,1));
		belakang = a%1000000000;
		kalimat = terbilang(depan) + ' Milyar '+ terbilang(belakang);
	}else if(a < 100000000000){
		utama = a/1000000000;
		depan = parseInt(String(utama).substr(0,2));
		belakang = a%1000000000;
		kalimat = terbilang(depan) + ' Milyar '+ terbilang(belakang);
	}else if(a < 1000000000000){
		utama = a/1000000000;
		depan = parseInt(String(utama).substr(0,3));
		belakang = a%1000000000;
		kalimat = terbilang(depan) + ' Milyar '+ terbilang(belakang);
	}else if(a < 10000000000000){
		utama = a/10000000000;
		depan = parseInt(String(utama).substr(0,1));
		belakang = a%10000000000;
		kalimat = terbilang(depan) + ' Triliun '+ terbilang(belakang);
	}else if(a < 100000000000000){
		utama = a/1000000000000;
		depan = parseInt(String(utama).substr(0,2));
		belakang = a%1000000000000;
		kalimat = terbilang(depan) + ' Triliun '+ terbilang(belakang);
	}else if(a < 1000000000000000){
		utama = a/1000000000000;
		depan = parseInt(String(utama).substr(0,3));
		belakang = a%1000000000000;
		kalimat = terbilang(depan) + ' Triliun '+ terbilang(belakang);
	}else if(a < 10000000000000000){
		utama = a/1000000000000000;
		depan = parseInt(String(utama).substr(0,1));
		belakang = a%1000000000000000;
		kalimat = terbilang(depan) + ' Kuadriliun '+ terbilang(belakang);
	}else{
        kalimat="failed"
    }
    var pisah   = kalimat.split(' ');
    var full    = [];
    for(var i=0;i<pisah.length;i++){
        if(pisah[i] != ""){
            full.push(pisah[i])
        }
    }
    return full.join(' ');
}