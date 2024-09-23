
$('.register-form').on('submit', async function (e) {
   e.preventDefault();
   
   const full_name = $('input[placeholder="Full Name *"]').val();
   const username = $('input[placeholder="Username *"]').val();
   const email = $('input[placeholder="Email *"]').val();
   const password = $('input[placeholder="Password *"]').val();

   const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
         'Content-type': 'application/json',
      },
      body: JSON.stringify({ full_name, username, email, password })
   });

   const result = await response.text();
   alert(result);

   $('input[placeholder="Full Name *"]').val('');
   $('input[placeholder="Username *"]').val('');
   $('input[placeholder="Email *"]').val('');
   $('input[placeholder="Password *"]').val('');
});

$('.login-form').on('submit', async function(e) {
   e.preventDefault();

   const username = $('input[placeholder="Username"]').val();
   const password = $('input[placeholder="Password"]').val();

   const response = await fetch('http://localhost:3000/login', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({ username, password })
   });

   const result = await response.text();
   alert(result);
});

$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
