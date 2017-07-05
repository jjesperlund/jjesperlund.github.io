## Jesper Lund

```javascript
class Me extends Person {

    constructor() {
        super();
        
        this.name = 'Jesper Lund';
        this.age = 23;
        this.nationality = 'Swedish';
        this.occupation = 'MSc Student in Media Technology and Engineering';
        this.graduationYear = calcGraduationYear(this.name);
        this.favoriteLanguage = getFavLanguage();
    
        getFavLanguage() {
            return 'Javascript, obviously!';
        }

        calcGraduationYear(name) {
            if( name.split(' ')[0] == 'Jesper' && isAwesome(name) ) {
                return 2019;
            }
        }
    }   
}
```
