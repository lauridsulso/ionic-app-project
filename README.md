## HOW TO GAIN PROJECT ACCESS:
CLONE: https://github.com/emilbergs/ionic-app-project 


### IN BROWSER 🖥:
```
$ npm i
```
```
$ npm run start
```
or 
```
$ ionic serve
```
[Åben med iPhone 12 Pro screen size]

---------------------------------------------------------------------------------  


### ON IOS 📱:
```
$ npm i
$ ionic cap sync ios
$ ionic cap open ios
```
```
$ ionic cap run ios
```
or
```
$ ionic cap run ios -l --external
```

[Reminder: Husk at give permissions til iOS på xcode for at benytte native camera plugin]
```
NSCameraUsageDescription (Privacy - Camera Usage Description)
NSPhotoLibraryAddUsageDescription (Privacy - Photo Library Additions Usage Description)
NSPhotoLibraryUsageDescription (Privacy - Photo Library Usage Description)
```

---------------------------------------------------------------------------------  


### ON ANDROID 🤖:
```
$ npm i
$ ionic cap sync android
$ ionic cap open android
$ ionic cap run android
```
or
```
$ ionic capacitor run android -l --external
```
[Vælg et android device i Android SDK]

[Reminder: Husk at give permissions i Android manifest, hvis storage skal virke på native camera]:

```
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```
---------------------------------------------------------------------------------  


Efterfølgende skal der oprettes en bruger, med et hvilket som helst password og email.  
  
  


## HVAD ER KONCEPTET? 🤗

Vi har lavet en applikation, som hjælper brugere med at få løst diverse opgaver. Brugerne kan oprette en profil, og derefter oprette forskellige opgaver, som andre brugere kan løse. En task består af en titel, beskrivelse, løn, lokation, dato og billede.

Der er mulighed for at se en liste med alle oprettede tasks, en liste med egne oprettede tasks, samt en profilside, hvor det er muligt at opdatere navn, telefonnummer og email.

På dine tasks siden kan man gennemgå alle sine egne opgaver, hvor man også har mulighed for at opdatere dem. Hvis opgaven derefter skulle være løst eller blot skal slettes kan man også det.

Applikationens ene use case består af en bruger, som skal have løst en opgave. Efter brugeren er oprettet, har de mulighed for at oprette opgaver, som brugeren ikke selv har tid, mulighed eller lyst til at løse.

Det andet use case består af en bruger, som gerne vil tjene penge ved at klare opgaver. Applikationen kan anvendes af både privatpersoner såvel som mindre og større virksomheder.

Idéelt set vil applikationen også indeholde en chat funktion, så de to interessenter kan komme i kontakt med hinanden. - Dette er klart noget, der ville være relevant at implementere efterfølgende. Derudover ville implementationen af noget som stripe være optimalt, så vi stod for en sikker betaling mellem de to parter.   
  
  

## DESIGN CHOICES 👨🏾‍🎨

Ved at benytte os af et user interface library, i dette tilfælde Ionic’s pre-styled components, sikrer vi i høj grad et gennemtestet design. Vi må antage at komponenterne er designet af folk med sans for UI/UX, mens komponenterne ligeledes konstant testes af tusindvis af brugere, på tværs af forskellige projekter og platforme. Ydermere sikrer vi et gennemgående design tema på tværs af de forskellige komponenter, således at den røde tråd holdes i designet.

Vi har valgt et simpelt farveskema bestående af hvid og sort som vores primærfarver, samt en rød farve til log ud. 

Vi har gjort brug af ikoner, for at guide brugeren, og give dem bedre indblik i funktionaliteten.

Vi har valgt at bruge en tab bar navigation med passende ikoner, for at brugerne nemt kan navigere rundt i applikationens funktioner.

## PROJECT STRUCTURE AND “THINKING IN REACT” 🤔

Projektets struktur er primært opdelt i components og pages. Alle vores pages er lagt ind under samme mappe, hvor alle er en IonPage. Derudover har vi flere komponenter som dels står for forskellig funktionalitet eller design.

På længere sigt kunne vi godt have tænkt os at lave mere generiske komponenter og bedre opdeling af funktionalitet så vi ikke havde så mange gentagelser af den samme kode og for at give os en bedre “separation of concerns”.

Igennem dette projekt har vi haft fokus på component baseret programmering, derudover har vi:

- Sat/holdt data i hooks ved hjælp af useState, loadet og håndteret data ved brug af useEffect.
- Lavet en single page application, som navigere med react-router og useHistory.
- Verificeret brugere, gemt data med firebase.
- Brugt capacitor til native plugins som: Kamera, Splashscreen og Toasts



### APPLICATION PREVIEW 👀
![image](https://user-images.githubusercontent.com/56149568/159179525-4de0f1e1-44e4-4a2f-8e5c-3aab56181f4f.png)
![image](https://user-images.githubusercontent.com/56149568/159179555-c7c7ee01-348a-4b15-a76b-ddfa25bc91b2.png)
![image](https://user-images.githubusercontent.com/56149568/159179572-4165f4ab-e65e-4be7-8b18-5b2db393b500.png)
