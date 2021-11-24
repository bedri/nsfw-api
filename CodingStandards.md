# Genel
1. **,** ve **;**  larin onunde bosluk yok 
2. degil icin **!** kullandiginda ardindan bir bosluk
3. satir cok uzunsa bir operatorden sonra bol
```javascript
// Bad
var html = '<p>The sum of ' + a + ' and ' + b + ' plus ' + c
    + ' is ' + ( a + b + c ) + '</p>';
 
// Good
var html = '<p>The sum of ' + a + ' and ' + b + ' plus ' + c +
    ' is ' + ( a + b + c ) + '</p>';
```
4. commentlerde // den sonra bosluk olsun.
5. ileride yapılacak birseyi belirtmek icin **TODO** yaz
```
// TODO:
<!-- TODO:
```
6. Değişken, id, class, vs... tanımlayıcı isimleri olabildiğince kısa, gerektiği kadar uzun olsun
7. Bloklar (js'de {}, html'de iç içe tag'lar vs..) indentli olsun. 
8. If you’re editing code, take a few minutes to look at the code around you and determine its style. If they use spaces around all their arithmetic operators, you should too. If their comments have little boxes of hash marks around them, make your comments have little boxes of hash marks around them too.

	The point of having style guidelines is to have a common vocabulary of coding so people can concentrate on what you’re saying rather than on how you’re saying it. We present global style rules here so people know the vocabulary, but local style is also important. If code you add to a file looks drastically different from the existing code around it, it throws readers out of their rhythm when they go to read it. Avoid this.

9. satir sonlarinda bosluk kalmasin

# CSS
1. css tanimlayicilarda kelimeleri **-** ile ayir, kelimeleri birlestirme _ kullanma
```css
customer-coin-selection {

}
```
2. birden fazla selector kullanilacaksa her biri ayri satira
```css
header,
nav,
footer {
    display: block;
}
```
3. css selector proerty, degerler vs. de sadece kucuk harf kullan
```css
color: #E5E5E5; //degil
color: #e5e5e5;
```
4. css dosyasinda  style leri belli bolumlerde topla
```css
/* Header */

#adw-header {}

/* Footer */

#adw-footer {}

```
5. stringlerde " degil, ' kullan
	1. url lerde tirnak kullanma
```css
@import url(https://www.google.com/css/maia.css);

font-family: 'open sans', arial, sans-serif;
```
6. css tanimlarken {  ayni satirda, ve selector ile arasinda bosluk var
```css
#video {
  margin-top: 1em;
}
```
7. property tanımlarken : dan sonra bosluk, her property sonuna ;
```css
font-weight: bold;
```
8. css de kendi tanimladiklarimiza le-  prefix i koyalim.
```css
.le-alert-box {
    text-align: center;
```


# HTML
1. html element, atirbute leri de sadece kucuk harf kullan
```html
<img src=
```
2. Although fine with HTML, do not close void elements, i.e. write 
```html
<br>
<br /> <!-- degil -->
```
3. tag in icerigi ile > arasinda bir bosluk olsun ve sonunda < ile...
```html
<a class="maia-button maia-button-secondary"> Sign in </a>
```
4. tag attribute leri ' degil  " ile yazilsin
5. Her blok, liste veya tablo öğesi için yeni bir satır kullanın ve bu tür her alt öğenin girintisini artırın.
```html
<div>
	<table>
		<tr>
		</tr>
	</table>
</div>
```
6. tag atrribute lerinin hr biri ayri satirda 1 tab indent li yapilabilir. mumkunse tek satirda olsun, bolunecekse bu formatta bolunsun
```html
<md-progress-circular
    md-mode="indeterminate"
    class="md-accent"
    ng-show="ctrl.loading"
    md-diameter="35">
</md-progress-circular>
```


# JAVASCRIPT
1. mumkun oldugunca fat arrow (=>) kullanilsin, tek bile olsa parantez 
kullanilsin
	1. object icinde this ile ilgili sorun olacaksa shorter syntax kullanilsin
```javascript
f = (a, b) => {

}

f = (a) => {

}

const obj = {
  foo() {
    return 'bar'
  }
}

```

2. fonksiyon adlarinda lowerCamelCase
	1. fonk. isimleri fiille baslasin  checkAddress,  copyAddress,  checkAmount, set...
	2. boolean donenler is/has ile baslasin,   isLetter, isTransactionValid, hasDigit,  ...

3. fonskyion cagirirken argumanlarin iki tarafina (parantezlerle argumanlar arasinda) bosluk yok
	1. argumanlar arasinda virgullerden sonra bir bosluk
```javascript
foo(arg)
foo('string', object)
```

4. fonksiyon adi ile ( bitisik olsun, blok parantezinden once bir boşluk
```javascript
fonksiyonAdi() {
}
```

5. isimlendirmelerde sadece ascii kullaniyoruz ($ gibi karakterler izin verilse de kullanmiyoruz)
	1. aciklayici isimler kullan, kisaltma kullanma, herkesce anlasilan DNS, URL gibi kisaltmalar kullanilabilir.
	2. sabitler buyuk harf, gerekirse _ kullanilabilir `const COIN_NUMBER = 5`

6. sonlarda noktali virgul kullanMIyoruz.

7. ==  yerine === kullan

8. var yerine let kullan, sabit kalacaklar icin const kullan

9. string birlestirmelerinde template literal kullan  
```javascript
`${amount} kadar coin ${address} adresine gonderildi`
```

10. booleanlar icin shortcut kullan

``` javascript
if (isValid === true)  //yerine 
if (isValid)

if (isValid === false) //yerine 
if (! isValid)
```
11. her satirda tek degisken tanimla
```javascript
let a = 1, b = 2 //yerine

let a = 1
let b = 2
```

12. operatorlerin ( + / * -) arasina bosluk koy
```javascript
fullPrice = price + (price * tax)
```

13. stringlerde " degil, ' kullan

14. dizilerde basta sonda bosluk yok [a, b, c], objecler icin de boyle {a:v, g:b}

15. if, while, for
	1. ifadeler tek satir bile olsa alt satira ve indentli yazilsin.  tek satir ise {} olmayabilir
	2. bloklardan sonra else/catch  gibi ifadeler altta yeni satirda baslasin } in yaninda degil
	3. if, while, for lardan sonra parantezden once bosluk olsun, parantez icinde basta sonra bosluk yok.
	```javascript
	if (isValid)
	```
	4. if de kriterler cok uzun olacaksa, mantiksal opereatorlerden sonra bolunsun


16. promise lerde then lere fonsksiyon dogrudan verilmek yerine, fat arrow ile verilip fonk. onun icinde cagrilsin
```javascript
fetch(URL)
.then(res => {
	return res.json()
})
.then(this.setSupportedCoins)

//yerine

fetch(URL)
.then((res) => {
	return res.json()
})
.then((res) => {
	this.setSupportedCoins(res)
})

```



