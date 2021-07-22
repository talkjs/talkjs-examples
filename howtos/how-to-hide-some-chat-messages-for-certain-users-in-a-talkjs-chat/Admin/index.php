<!DOCTYPE html>
<html>
    <head>
        <title>(Stella) Admin</title>

        <link href="https://fonts.googleapis.com/css?family=Karla:400" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

        <style>
            html, body {
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
                <button type="button" id="resetFilters" class="btn btn-secondary btn-sm">Reset Filters</button>
                <button type="button" id="filterTextMessages" class="btn btn-primary btn-sm">Show Only Text Messages
                </button>
                <button type="button" id="filterAttachments" class="btn btn-primary btn-sm">Show Only
                    Attachments</button>
                <button type="button" id="showOnlyAdminMessages" class="btn btn-primary btn-sm">Show Only Admin
                    Messages</button>
                <button type="button" id="hideBannerUserMessages" class="btn btn-primary btn-sm">Hide Messages From
                    Banned Users</button>
            </div>


            <div class="row">

                <div class="col" style="width: 40%; margin-top: 30px; height: 500px">
                    <div class="card text-white bg-secondary mb-3">
                        <div class="card-header">Conversation Details</div>
                        <div class="card-body justify-content-start">
                            <p>Chris Pratt (Role: Accountant) </p>
                            <p>Jamie Hubs (Role: Staff) </p>
                            <p>Stella Solo (Role: Admin) </p>
                            <p>Matt Wong <bold>(Role: Banned)</bold> </p>

                        </div>
                    </div>
                </div>

                <div id="talkjs-container" style="width: 60%; margin-top: 30px; height: 500px">
                    <i>Loading chat...</i>
                </div>

            </div>

        </div>
    </div>

        <script>
        (function(t,a,l,k,j,s){
        s=a.createElement('script');s.async=1;s.src="https://cdn.talkjs.com/talk.js";a.head.appendChild(s)
        ;k=t.Promise;t.Talk={v:3,ready:{then:function(f){if(k)return new k(function(r,e){l.push([f,r,e])});l
        .push([f])},catch:function(){return k&&new k()},c:l}};})(window,document,[]);
        </script>

        <script>
          Talk.ready.then(function() {
              var me = new Talk.User({
                  id: "135487",
                  name: "Stella",
                  email: "stellaadmin@example.com",
                  photoUrl: "https://picsum.photos/200",
                  welcomeMessage: "Hey there! How are you? :-)",
                  role: "Admin"
              });
              window.talkSession = new Talk.Session({
                  appId: "APP_ID",
                  me: me
              });       

              var chatbox = talkSession.createChatbox();
              chatbox.mount(document.getElementById("talkjs-container"));

              chatbox.on("sendMessage", function(ev) {
                  if (!ev.message.attachment) {
                      console.log("Text message")
                      ev.override({
                          custom: {
                              textMessage: "true"
                          }
                      });
                  }
              });

              document.getElementById('filterTextMessages').onclick = function filterTextMessages() {
                  chatbox.setMessageFilter({
                      custom: {
                          textMessage: "exists"
                      }
                  })
              }

              document.getElementById('filterAttachments').onclick = function filterAttachments() {
                  chatbox.setMessageFilter({
                      custom: {
                          textMessage: "!exists"
                      }
                  })
              }

              document.getElementById('hideBannerUserMessages').onclick = function filterAttachments() {
                    chatbox.setMessageFilter({
                        sender: {
                            role: ["!=", "Banned"]
                        }
                    })
                }

              document.getElementById('resetFilters').onclick = function filterAttachments() {
                  chatbox.setMessageFilter(null)
              }

          });
        </script>
    </body>

</html>
