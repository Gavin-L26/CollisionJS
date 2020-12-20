# CollisionJS

## Landing Page
https://safe-lowlands-15717.herokuapp.com/

## Getting Started

### Required library
- JQuery

### Script to Include
To use Collision JS, include the following script
```html
<script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script defer type="text/javascript" src="js/collisionJS.js"></script>
```
### Simple Example
- JavaScript
```javascript
const example = new InteractiveObjects("#example");
example.addRect(0, 0, 100, 100, 80, 80);
```

- HTML
```html
<head>
    <meta charset="utf-8">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script defer type="text/javascript" src="js/collisionJS.js"></script>
    <script defer type="text/javascript" src="js/example1.js"></script>
</head>

<body>   
    <div id="example" style="position: absolute; left: 30px; top: 30px; width: 750px; height: 300px; border: 1px solid lightgray;">
    </div>
</body>
```

## Documentation
