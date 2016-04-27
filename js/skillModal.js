var inSkill = false;

$('#assignSkill').click(function(){
  inSkill = false;
  $('#skillBox').show();
  $('#skillChecklists').show();
  $('#skillLoadingText').hide();
  $('#closeSkills').hide();
  $('#addSkills').show();
  $('#cancelSkills').show();
  $("#skillBox").html(skillBoxHTML);
  $('.skillSelect').hide();
  $('#skillModal').modal({
        keyboard: false,
        backdrop: 'static'
    });
  
  $('.skillButton').click(function(){
        if(!inSkill){
          $('.skillButton').not(this).each(function(){
            $(this).fadeOut('fast'); 
          })
          $(this).animate({
            height: '50px'
          })
          loadSkillHTML($(this).text());
          inSkill = true;
        }
        else{
          $('.skillButton').not(this).each(function(){
            $(this).show('fast');  
          })
          $(this).animate({
            height: '100px'
          })
          $('.skillSelect').fadeOut('fast');
          inSkill = false;
        }
      })
  
})

function loadSkills(skills){
    skillIds = [];
    if(skills){
      $.each(skills,function(key,val){
        skillIds.push(val.id);
      })
    }
    var usertable;
    $.getJSON("/accountCreate/listSkills",function(data){
    //$.getJSON("json/rest/member/listSkills",function(data){
        skillsHTML = "";
        skillChecklists = "";
        $.each(data.statements, function (key,category) {
          categoryName = Object.keys(category)[0].replace(/\s/g, '');
          categorySkill = "";
          skillChecklists += "<div id="+categoryName+"Skill class='skillSelect' >";
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
function skillString(cookSkills,genLaborSkills,handySkills){
  cookString = "";
  genLaborString = "";
  handyString = "";
  if(cookSkills.length + genLaborSkills.length + handySkills == 0){
    return "None";
  }
  if(cookSkills.length==0){
    cookString = "";
  }
  else{
    cookString = "Cooking Skills: "+ cookSkills.toString()+"<br>";
  }
  if(genLaborSkills.length==0){
    genLaborString = "";
  }
  else{
    genLaborString = "General Labor Skills: "+ genLaborSkills.toString() +"<br>";
  }
  if(handySkills.length==0){
    handyString = "";
  }
  else{
    handyString = "Handy Skills: "+ handySkills.toString() +"<br>";
  }
  return cookString+genLaborString+handyString;
}

function loadSkillHTML(categoryName){
    $("#"+categoryName.replace(/\s/g, '')+"Skill").fadeIn('fast');
}

function resetSkillModal(){
  $('.skill').prop('checked',false);
  $('#skillList').html('None');
}

skillBoxHTML =  '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">General Labor</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Cook</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Handy</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Church Service</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Teach</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Social</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Kids</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Music</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Drama</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Grounds</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Clean</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Compassion</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Art</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Office</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Legal</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Engineering</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Crafts</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Business</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Language</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Mentor</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Counseling</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Mechanical</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Missions</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Speaking</button></div>';