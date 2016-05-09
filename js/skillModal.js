var inSkill = false;

$('#assignSkill').click(function(){
  $('#backButtonSkills').hide();
  inSkill = false;
  $('#skillBox').show();
  $('#skillChecklists').show();
  $('#skillLoadingText').hide();
  $('#addSkills').show();
  $('#cancelSkills').show();
  $("#skillBox").html(skillBoxHTML);
  $('.skillSelect').hide();
  $('#skillModal').modal({
        keyboard: false,
        backdrop: 'static',
    });
  
  $('.skillButton').click(function(){
        if(!inSkill){
          $('.skillButton').each(function(){
            $(this).fadeOut('fast'); 
          })

          loadSkillHTML($(this).text());
          inSkill = true;
          $('#backButtonSkills').show();
        }
      })
})

$('#backButtonSkills').click(function(){
  $('.skillButton').each(function(){
      $(this).show('fast');  
    })
    $('.skillSelect').fadeOut('fast');
    $('#backButtonSkills').hide();
    inSkill = false;
})

function loadSkills(skills){
    skillIds = [];
    if(skills){
      $.each(skills,function(key,val){
        skillIds.push(val.id);
      })
    }
    var usertable;
    $.getJSON("/rest/accountCreate/listSkills",function(data){
        skillsHTML = "";
        skillChecklists = "";
        $.each(data.statements, function (key,category) {
          categoryName = Object.keys(category)[0].replace(/\s/g, '').replace('/','');
          categorySkill = "";
          skillChecklists += "<div id="+categoryName+"Skill class='skillSelect'>"
          +"<h3>"+Object.keys(category)[0]+"</h3>";
          $.each(category,function (key,skill) {
              $.each(skill,function(key,val){
                  if($.inArray(val.id,skillIds)>=0){
                    categorySkill+="<li>"+val.skillName+"</li>";
                  }
                  skillChecklists += "<div class='checkbox'><label><input type='checkbox' class='skill' id='"+val.id+"' value='"+val.id+
                  "'></label>"+val.skillName+"</div>";
              })
          })
          if(categorySkill.length>0){
            skillsHTML+=Object.keys(category)[0]+"<br><ul>"+categorySkill+"</ul>";
          }
          skillChecklists +="</div>";
        })


        $("#skillChecklists").html(skillChecklists);
        $('.searchable-skill tr').show();
        $('.skillSelect').hide();
        $('#skillsHTML').html(skillsHTML);

        for(var i=0;i<skillIds.length;i++){
           $("#"+skillIds[i]).prop('checked',true);
        }
        
    })
}



/*
$('#cancelSkills').click(function(){
  $('.skill').each(function(){
    if($.inArray($(this).val(), genLaborSkills)>=0){
      $(this).prop('checked',true);
    }
    else{
      $(this).prop('checked',false);
    }
    if($.inArray($(this).val(), handySkills)>=0){
      $(this).prop('checked',true);
    }
    else{
      $(this).prop('checked',false);
    }
    if($.inArray($(this).val(), cookSkills)>=0){
      $(this).prop('checked',true);
    }
    else{
      $(this).prop('checked',false);
    }
  })
  $('#skillList').html(skillString(cookSkills,genLaborSkills,handySkills));
})
*/

function loadSkillHTML(categoryName){
    $("#"+categoryName.replace(/\s/g, '')+"Skill").fadeIn('fast');
}

function resetSkillModal(){
  $('.skill').prop('checked',false);
  $('#skillList').html('None');
}

skillBoxHTML =  '<div class="col-md-4 skillButtonCol"><button type="button" value="ArtsandCrafts" class="btn btn-default skillButton">Arts and Crafts</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="biblical" class="btn btn-default skillButton">Biblical</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="churchservice" class="btn btn-default skillButton">Church Service</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="cleaning"  class="btn btn-default skillButton">Cleaning</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="compassion" class="btn btn-default skillButton">Compassion</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="cooking"  class="btn btn-default skillButton">Cooking</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="counseling" class="btn btn-default skillButton">Counseling</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="drama" class="btn btn-default skillButton">Drama</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="engineering" class="btn btn-default skillButton">Engineering</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="funding" class="btn btn-default skillButton">Funding</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="generallabor" class="btn btn-default skillButton">General Labor</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="grounds" class="btn btn-default skillButton">Grounds</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="homeimprovement" class="btn btn-default skillButton">Home Improvement</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="kids" class="btn btn-default skillButton">Kids</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="language" class="btn btn-default skillButton">Language</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="legal" class="btn btn-default skillButton">Legal</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="mechanical"  class="btn btn-default skillButton">Mechanical</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="medical"  class="btn btn-default skillButton">Medical</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="mentoring"  class="btn btn-default skillButton">Mentoring</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="missions"  class="btn btn-default skillButton">Missions</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="music"  class="btn btn-default skillButton">Music</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="office"  class="btn btn-default skillButton">Office-Business</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="social"  class="btn btn-default skillButton">Social</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" value="teaching"  class="btn btn-default skillButton">Teaching</button></div>';