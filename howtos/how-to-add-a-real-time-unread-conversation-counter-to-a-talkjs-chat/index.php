<!DOCTYPE html>
<html>
   <head>
      <title>Jacob</title>
      <link href="https://fonts.googleapis.com/css?family=Karla:400" rel="stylesheet" type="text/css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
         integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <style>
         html,
         body {
         height: 100%;
         }
         body {
         margin: 0;
         padding: 0;
         width: 100%;
         display: table;
         font-weight: 100;
         font-family: 'Karla';
         }
         .container {
         text-align: center;
         display: table-cell;
         vertical-align: middle;
         background: #CEE2FD;
         }
         .content {
         text-align: center;
         display: inline-block;
         }
         .title {
         font-size: 96px;
         }
         .opt {
         margin-top: 30px;
         }
         .opt a {
         text-decoration: none;
         font-size: 150%;
         }
         a:hover {
         color: red;
         }
      </style>
   </head>
   <body>
      <div class="container">
         <div class="content">
            <div>
               <h1 style=>Hi Jacob, you have <span id="unreadCount" style="font-weight: bold; color: blue"> 0 </span> unread conversations.</h1>
            </div>
            <div class="row justify-content-center">
               <div class="col-8" id="talkjs-container" style="width: 60%; margin-top: 30px; height: 500px">
                  <i>Loading chat...</i>
               </div>
            </div>
         </div>
      </div>
      <script>
         (function(t, a, l, k, j, s) {
             s = a.createElement('script');
             s.async = 1;
             s.src = "https://cdn.talkjs.com/talk.js";
             a.head.appendChild(s);
             k = t.Promise;
             t.Talk = {
                 v: 3,
                 ready: {
                     then: function(f) {
                         if (k) return new k(function(r, e) {
                             l.push([f, r, e])
                         });
                         l
                             .push([f])
                     },
                     catch: function() {
                         return k && new k()
                     },
                     c: l
                 }
             };
         })(window, document, []);
      </script>
      <script>
         Talk.ready.then(function() {
             var me = new Talk.User({
                 id: "333333",
                 name: "Chris Pratt",
                 email: "chris@example.com",
                 photoUrl: "https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y",
                 welcomeMessage: "Hey there! How are you? :-)",
                 role: "Default"
             });
             window.talkSession = new Talk.Session({
                 appId: "APP_ID",
                 me: me
             });
         
             var inbox = talkSession.createInbox();
             inbox.mount(document.getElementById("talkjs-container"));
         
             window.talkSession.unreads.onChange(function (conversationIds) {
                 console.log(conversationIds)
                 var amountOfUnreads = conversationIds.length;
                 document.getElementById("unreadCount").textContent= amountOfUnreads;
                 console.log("Unread count is " + amountOfUnreads)
             });
         
         
         });
      </script>
   </body>
</html>