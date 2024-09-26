//form register
$('.register-form').on('submit', async function (e) {
   e.preventDefault();
   

   const username = $('input[placeholder="Username *"]').val();
   const email = $('input[placeholder="Email *"]').val();
   const password = $('input[placeholder="Password *"]').val();

   const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
         'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, email, password })
   });

   const result = await response.text();
   alert(result);

   $('input[placeholder="Username *"]').val('');
   $('input[placeholder="Email *"]').val('');
   $('input[placeholder="Password *"]').val('');
});

//penanganan form login
$('.login-form').on('submit', async function(e) {
   e.preventDefault();

   const username = $('input[placeholder="Username"]').val();
   const password = $('input[placeholder="Password"]').val();

   const response = await fetch('http://localhost:3000/login', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({ username, password }),
   });

   const result = await response.text()

   if (response.ok) {
      window.location.href = '/dashboard.html';
   } else {
      alert('Login failed' + result);
   }
});

$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
