skillsArray = [];
$(document).ready(function(){
    skillsArray = []
    $("#name").val('');
    $("#phone").val('');
    $("#email").val('');
    $('#primaryChurchOrg').val('');
    $('#skillIds').val('');
    loadSkills();
    $.getJSON('/accountCreate/listChurchOrgs', function(data){
        orgHTML = '<option selected disabled>-</option>';
        $.each(data.statements, function (key,val){
          orgHTML += '<option value="'+val.id+'">'+val.orgName+'</option>'; 
        })
        $('#primaryChurchOrg').html(orgHTML);
    })
});

$('#addSkills').click(function(){
  skillsArray = [];
  allSkills = {};
  skillsHTML = "";
  $('.skill:checked').each(function(){
      skillsArray.push($(this).val());
      category = $(this).parent().parent().parent().prop("id").replace("Skill","").split(/(?=[A-Z])/).join(' ');
      if(allSkills[category]){
        allSkills[category] = allSkills[category]+"<li>"+$(this).parent().parent().text()+"</li>";
      }
      else{
        allSkills[category] = "<li>"+$(this).parent().parent().text()+"</li>";
      }
    
  })
  $.each(allSkills,function(key,val){
    skillsHTML+=key+"<br><ul>"+val+"</ul>"
  })
  $('#skillsHTML').html(skillsHTML);
  $('#skillIds').val(skillsArray.toString());
  $('#skillModal').modal('hide');
})



$("#resetButton").click(function(){
    $("#changingPassword").hide();
    $("#changedPassword").hide();
    $("#passwordChange").show();
    $('#myModalPass').modal({
        keyboard: false,
        backdrop: 'static'
    })
    $("#userSubmit").show();
    $('#myModalPass').modal('show');
})

$('#userSubmit').click(function(){
    submitNewPassword();
})

function submitNewPassword(){
    $('#modalPassValidation').html("");
    $('#loginLink').hide();
    $('#modalPassValidation').css("color","red");
    name = $("#name").val();
    phone = $("#phone").val();
    email = $("#email").val();
    churchOrg = $('#primaryChurchOrg').val();
    skills = $('#skillIds').val();
    password = $("#password").val();
    passwordCheck = $("#passwordCheck").val()
    validationString = "";
    valid = true;
    if(!email || email.length==0){
        validationString+="Please enter an email address.<br>";
        valid = false;
    }
    if(!phone || phone.length==0){
        validationString+="Please enter a phone number.<br>";
        valid = false;
    }
    if(skillsArray.length==0){
        validationString+="Please select at least one skill.<br>";
        valid = false;
    }
    if(password != passwordCheck){
        validationString+="Passwords don't match.<br>";
        valid = false;
    }
    if(password.match(/[0-9]/g) == null){
        validationString+="Password must contain a number.<br>";
        valid = false;
    }
    if(password == password.toUpperCase()){
        validationString+="Password must contain a lower case letter.<br>";
        valid = false; 
    }
    if(password == password.toLowerCase()){
        validationString+="Password must contain an upper case letter.<br>";
        valid = false; 
    }
    if(password.indexOf("#")<0 && password.indexOf("@")<0 && password.indexOf("!")<0 && password.indexOf("$")<0 
        && password.indexOf("?")<0 && password.indexOf("%")<0){
        validationString+="Password must have one of the following special characters: !@#$%?<br>";
        valid = false;
    }
    if($("#termsChecked").prop('checked') == false){
        validationString+="You must agree with the terms and conditions.<br>";
        valid = false;
    }
    if(!valid){
        $('#modalPassValidation').html(validationString);
        return false;
    }
    $("#statusText").html("Creating account... Please wait a moment.")
    var shaObj = new jsSHA(password, "TEXT");
    var hash = shaObj.getHash("SHA-512", "HEX");

    whatCanWeDoHTML= "<ul>";
    $.each($('.whatCanWeDo:checked'),function(key,val){
      whatCanWeDoHTML+= "<li>"+$($(val).parent()).text()+"</li>";
    });
    whatCanWeDoHTML += "</ul>";
    
    $("#passwordChange").show();
    $('#myModalPass').modal({
        keyboard: false,
        backdrop: 'static'
    })
    $('#myModalPass').modal('show');
    $.post("/accountCreate/addUser",
        {name:name,email:email,phone:phone,churchOrg:churchOrg,skills:skills,hash:hash},
        function(data){
            $('#loginLink').hide();
            $("#statusText").html(data.status);
            $("#passwordChange").hide();
            $("#changedPassword").show();
            $("#changingPassword").hide();
    })
}

$("#loginLink").click(function(){
    window.location.href = "https://hiskingdom.needsgap.com/serveTogether/index.html?email="+ $('#email').val();
})
