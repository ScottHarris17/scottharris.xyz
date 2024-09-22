<!DOCTYPE html>
<html lang="en">
<head>

  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="homestyle.css">

  <!-- jQuery-->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

  <!--Favicon-->
  <link rel="shortcut icon" type="image/png" href="favicon.png" />

  <title>Scott Harris Home</title>

</head>
<body>



  <!-- Full-Width "Navbar" -->
  <nav class="navbar navbar-light"
    style="justify-content: center; background-image: linear-gradient(to right, #256845, #3c9a69); padding: 20px 0; width: 100vw; margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
    <span class="navbar-brand mb-0 h1" style="color: #fff; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">
      <h1 style="font-size: 2.8rem; font-weight: bold; letter-spacing: 1px; margin: 0;">Scott C. Harris, PhD</h1>
    </span>
</nav>




<div class = "card" style="text-align: center" onclick="showContent()">
  <div class = "card-title"><h3>This is the card</h3></div>
  <div class = "content" id ="content" style="display: none;">Hello</div>
</div>

<script>

var contentState = 0
function showContent(){
  var content = document.getElementById("content");
  if(contentState === 0){
    $("#content").slideDown("slow");
    contentState = 1
  }
  else{
    $("#content").slideUp("slow");
    contentState = 0
 }

  return
}
</script>
</body>

</html>