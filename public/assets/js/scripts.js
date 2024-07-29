(function (window, undefined) {
  'use strict';
  flatpickr('.flatpickr-input',{
    dateFormat: "d-m-Y",
    });
    flatpickr('.flatpickr-time',{
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
    });
})(window);

$(document).ready(function(){

  //EDIT ROLE
    $('body').on('click','#editRole', function(e){
      e.preventDefault();
      var data = $(this).data();
      var id = data.roleId;
      $.ajax({
            url:'edit-role/'+id,
            type:'GET',
            success:function(data){
              $('#rolesModal #roleName').val(data.role_name);
              $('#rolesModal form').attr("action","update-role/"+data.id);
              $('#rolesModal #roleModalButton').html('Update');
              $('#roleModalLabel').html('Edit Role');
            
            }
      });
      $('#rolesModal').modal();
    });

  //EDIT Employee
  $('body').on('click','#editEmployee', function(e){
    e.preventDefault();
    var data = $(this).data();
    var id = data.employeeId;
    $.ajax({
          url:'edit-employee/'+id,
          type:'GET',
          success:function(data){
            const bankaccount_details = data.bankaccount_details ? JSON.parse(data.bankaccount_details) : [];
            $('#employeeModalLabel').html("Edit Employee");
            $('#passwordInput').show();
            $('#employeeModal form').attr("action","update-employee/"+data.id);
            $('#employeeModal #employeeName').val(data.name);
            $('#employeeModal #employeeMobile').val(data.mobile);
            $('#employeeModal #employeeEmail').val(data.email).attr('readonly','readonly');
            $('#employeeModal #employeeAddress').val(data.address);
            $('#employeeModal #employeePincode').val(data.pincode);
            $('#employeeModal #state').val(data.state);
            $('#employeeModal #employeeRole').val(data.role_id);
            $('#employeeModal #employeePan').val(data.pancard);
            $('#employeeModal #employeeAadhar').val(data.aadhar);
            $('#employeeModal #employeeAccountNo').val(bankaccount_details.account_number != undefined ? bankaccount_details.account_number : '');
            $('#employeeModal #employeeIfscCode').val(bankaccount_details.ifsc_code != undefined ? bankaccount_details.ifsc_code : '');
            $('#employeeModal #branchName').val(bankaccount_details.branch_name != undefined ? bankaccount_details.branch_name : '');
            $('#employeeModal #accountHolder').val(bankaccount_details.account_holder != undefined ? bankaccount_details.account_holder : '');
            $('#employeeModal #employeeImage').html('<img src="/assets/employeeData/Emp_Id_'+data.id+'/'+data.photo+'" width="100px">');
            var doc="";
            for(i=0;i<JSON.parse(data.documents).length;i++){
              doc+='<a href="/assets/employeeData/Emp_Id_'+data.id+'/'+JSON.parse(data.documents)[i]+'" target="_blank" style="color:#000"><i class="fa-regular fa-file-pdf fa-3x px-2 mb-2"></i></a><button type="button" id="deleteDocument" class="btn-close" aria-label="Close" data-employee-id="'+data.id+'" data-document-name="'+JSON.parse(data.documents)[i]+'"></button>';
              $('#employeeModal #employeeDocuments').html(doc);
            }
            $('#employeeModal #employeeModalButton').html('Update');
          }
      });
  });

    //Delete Document;
    $('body').on('click','#deleteDocument', function(e){
      e.preventDefault();
      var data = $(this).data();
      var id = data.employeeId;
      var documentName = data.documentName;
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          } 
        });
      $.ajax({
            url:'delete-document/'+id,
            type:'POST',
            data:{'documentName':documentName},
            success:function(data){
              var doc="";
              for(i=0;i<JSON.parse(data.documents).length;i++){
                doc+='<a href="/assets/employeeData/Emp_Id_'+data.id+'/'+JSON.parse(data.documents)[i]+'" target="_blank" style="color:#000"><i class="fa-regular fa-file-pdf fa-3x px-2 mb-2"></i></a><button type="button" id="deleteDocument" class="btn-close" aria-label="Close" data-employee-id="'+data.id+'" data-document-name="'+JSON.parse(data.documents)[i]+'"></button>';
                $('#employeeModal #employeeDocuments').html(doc);
              }
            }

      });
    });

    $('body').on('click','#editLead', function(e){
      e.preventDefault();
      var data = $(this).data();
      var id = data.leadId;
      $.ajax({
            url:'edit-lead/'+id,
            type:'GET',
            success:function(data){
              $('#leadModalLabel').html("Edit Lead");
              $('#LeadModal form').attr("action","update-lead/"+data.id);
              $('#LeadModal #leaddate').val(data.date);
              $('#LeadModal #leadName').val(data.lead_name);
              $('#LeadModal #leadMobile').val(data.contact_number);
              $('#LeadModal #leadEmail').val(data.email);
              $('#LeadModal #assignTo').val(data.assign_to);
              $('#LeadModal #activityLog').val(data.activity_log);
              $('#LeadModal #followupDate').val(data.followup_date);
              $('#LeadModal #leadStatus').val(data.lead_status);
              chooseColour(data.lead_status);
              $('#LeadModal #source').val(data.source);
              $('#LeadModal #budget').val(data.budget);
              $('#LeadModal #remarks').val(data.remarks);
              $('#LeadModal #leadModalButton').html('Update');
            }
        });
    });

    //EDIT TRADE
    $('body').on('click','#editTarde', function(e){
      e.preventDefault();
      var data = $(this).data();
      var id = data.tradeId;
      $.ajax({
            url:'edit-trade/'+id,
            type:'GET',
            success:function(data){
              $('#tradeModalLabel').html("Edit Trade");
              $('#tradesModal #tradeName').val(data.name);
              $('#tradesModal form').attr("action","update-trade/"+data.id);
              $('#tradesModal #tardeModalButton').html('Update');
            }
      });
      $('#tradesModal').modal();
    });

  //add leadstatus colour
    $('#leadStatus').on('change',function(){
    var clrvalue=parseInt($('#leadStatus').val());
    chooseColour(clrvalue);
    });
    
   //chooseColour funtion
    function chooseColour(clrvalue){
      var bgcolour="";
      var color="";
      clrvalue=parseInt(clrvalue);
      switch(clrvalue) {
        case 1:
          bgcolour = "aqua";
          color="black";
          break;
        case 2:
          bgcolour = "yellow";
          color="black";
          break;
        case 3:
          bgcolour = "orange";
          color="black";
          break;
        case 4:
          bgcolour = "#E82F2F";
          color="white";
          break;
        case 5:
          bgcolour = "#48DF3C";
          color="white";
          break;
      }
         $('#leadStatus').css("background-color", bgcolour)
         $('#leadStatus').css("color",color);
        }
      
    // cashledger data show in Modal
    $('body').on('click','#cashLedgerdata', function(){
       var data= $(this).data();
       var id= data.cashledgerId;
       $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          } 
        });
       $.ajax({
        url:'show-cashledger-data/'+id,
        type:'GET',
        success:function(data){
          const payment_method = data.payment_method ? JSON.parse(data.payment_method) : [];
          var pa="";
          jQuery.each(payment_method , function(name, value){
             pa += ''+value+',';
        });
        $('#DataModal #paymentmethod').val(pa);
        $('#DataModal #dataname').val(data.customer_name
          !=null ? data.get_customer.name : data.vendor_name);
        $('#DataModal #datadate').val(data.payment_date.split("-").reverse().join("-"));
        $('#DataModal #dataAmount').val(data.amount);
        $('#DataModal #datadesc').val(data.description);
        $('#DataModal #dataCategory').val(data.get_category.category_name);
        $('#DataModal #dataTrade').val(data.get_trade.name);
        $('#DataModal #datadocs').html('<img src="cashledgerdocs/'+data.document_upload+'" width="150px">');
        }
      });
    });

    // cashledger edit Modal
    $('body').on('click','#editCashledger', function(){
       var data= $(this).data();
       var id= data.cashledgerId;
       $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          } 
        });
       $.ajax({
        url:'show-cashledger-data/'+id,
        type:'GET',
        success:function(data){
          const payment_method = data.payment_method ? JSON.parse(data.payment_method) : [];
          var pa="";
          jQuery.each(payment_method , function(name, value){
             if(value==$('#Checkboxcash').val()){
              $('#Checkboxcash').attr( 'checked', true );
             }
             else if(value==$('#Checkboxbanktransfer').val()){
              $('#Checkboxbanktransfer').attr( 'checked', true );
             }
             else if(value==$('#Checkboxcheque').val()){
              $('#Checkboxcheque').attr( 'checked', true );
             }
        });
        // $('#DataModal #paymentmethod').val(pa);
        if(data.customer_name!=null){
          $(' #partyName4').val(data.customer_name);
        }
        else{
          $("#partyName4").remove();
          $("#vendorname").val(data.vendor_name).attr('type','text');
        }
        $('#PaymentEditModal form').attr("action","cashledger-update/"+data.id);
        $(' #date4').val(data.payment_date.split("-").reverse().join("-"));
        $(' #Amount4').val(data.amount);
        $(' #desc4').val(data.description);
        $(' #category4').val(data.category);
        $(' #trade4').val(data.trade);
        $(' #docs').html('<img src="cashledgerdocs/'+data.document_upload+'" width="50px">');
        $('#cashledgerModalButton').html('Update');
        }
      });
    });
   
    // page reload on modal close
    $('.btn-close').on('click',function(){
      location.reload();
    });
   
    //VECHILE/JCB SECTION

    //TIME DURATION CALCULATION WITH START TIME 
    $('body').on('change','#startTime', function(e){
      var start_time = $('#vehicleModal #startTime').val();
      var end_time = $('#vehicleModal #endTime').val();
      if(start_time && end_time) {
          var time1 = start_time.split(':');
          var time2 = end_time.split(':');

          var hours1 = parseInt(time1[0], 10), 
              hours2 = parseInt(time2[0], 10),
              mins1 = parseInt(time1[1], 10),
              mins2 = parseInt(time2[1], 10);

          var hours = hours2 - hours1, mins = 0, seconds = 0;
              if(hours < 0) hours = 24 + hours;
              if(mins2 >= mins1) {
                  mins = mins2 - mins1;
              }
              else {
                  mins = (mins2 + 60) - mins1;
                  hours--;
              }
          $('#vehicleModal #totalTime').val(hours+'.'+mins);
        }
      });
     
    //TIME DURATION CALCULATION WITH END TIME 
    $('body').on('change','#endTime', function(e){
     var start_time = $('#vehicleModal #startTime').val();
     var end_time = $('#vehicleModal #endTime').val();
     if(start_time && end_time) {
        var time1 = start_time.split(':');
        var time2 = end_time.split(':');

        var hours1 = parseInt(time1[0], 10), 
            hours2 = parseInt(time2[0], 10),
            mins1 = parseInt(time1[1], 10),
            mins2 = parseInt(time2[1], 10);

        var hours = hours2 - hours1, mins = 0, seconds = 0;
            if(hours < 0) hours = 24 + hours;
            if(mins2 >= mins1) {
                mins = mins2 - mins1;
            }
            else {
                mins = (mins2 + 60) - mins1;
                hours--;
            }
        $('#vehicleModal #totalTime').val(hours+'.'+mins);
       }
    });

    // TOTAL AMOUNT CALCULATION
    $('body').on('blur','#ratePerHour', function(e){
      var rate_per_hour = $(this).val();
      var total_time = $('#vehicleModal #totalTime').val();

      var time = total_time.split('.');
      var hours = parseInt(time[0], 10);
      var min = parseInt(time[1], 10);
      min = min / 60;
 
      var hour_amount = hours * rate_per_hour;
      var min_amount = min * rate_per_hour;
      $('#vehicleModal #totalAmount').val(hour_amount+min_amount);
     
     });
 

    //EDIT VEHICLE REGISTRATION
    $('body').on('click','#editVehicle', function(e){
      e.preventDefault();
      var data = $(this).data();
      var id = data.vehicleId;
      $.ajax({
            url:'edit-vehicle/'+id,
            type:'GET',
            success:function(data){

              var start_time = data.start_time;
              var end_time = data.end_time;
         
              var time1 = start_time.split(':');
              var time2 = end_time.split(':');
         
              var hours1 = parseInt(time1[0], 10), 
                  hours2 = parseInt(time2[0], 10),
                  mins1 = parseInt(time1[1], 10),
                  mins2 = parseInt(time2[1], 10);
         
              var hours = hours2 - hours1, mins = 0, seconds = 0;
                 if(hours < 0) hours = 24 + hours;
                  if(mins2 >= mins1) {
                      mins = mins2 - mins1;
                  }
                  else {
                      mins = (mins2 + 60) - mins1;
                      hours--;
                  }
              $('#vehicleModalLabel').html('Edit Vehicle');
              $('#vehicleModal form').attr("action","update-vehicle/"+data.id);
              $('#vehicleModal #vehicleDate').val(data.date);
              $('#vehicleModal #vehicleNumber').val(data.vehicle_number);
              $('#vehicleModal #startTime').val(data.start_time);
              $('#vehicleModal #endTime').val(data.end_time);
              $('#vehicleModal #totalTime').val(hours+'.'+mins);
              $('#vehicleModal #ratePerHour').val(data.rate_per_hour);
              $('#vehicleModal #totalAmount').val(data.total_amount);
              $('#vehicleModal #vehicleModalButton').html('Update');
            }
        });
      });

  //EDIT VEHICLE REGISTRATION
  $('body').on('click','#editVisitor', function(e){
    e.preventDefault();
    var data = $(this).data();
    var id = data.visitorId;
    $.ajax({
          url:'edit-visitor/'+id,
          type:'GET',
          success:function(data){

            $('#visitorModal form').attr("action","update-visitor/"+data.id);
            $('#visitorModalLabel').html('Edit Visitor');
            $('#visitorModal #visitorName').val(data.name);
            $('#visitorModal #visitorNumber').val(data.mobile_number);
            $('#visitorModal #whomToMeet').val(data.whom_to_meet);
            $('#visitorModal #visitReason').val(data.visit_reason);
            $('#visitorModal #visitorTimeIn').val(data.time_in);
            $('#visitorModal #visitorTimeOut').val(data.time_out);
            $('#visitorModal #visitorDate').val(data.date);
            $('#visitorModal #visitorRemark').val(data.remark);
            $('#visitorModal #visitorModalButton').html('Update');
          }
      });
    });

  // BROKER SECTION

  //EDIT BROKER
  $('body').on('click','#editBroker', function(e){
    e.preventDefault();
    var data = $(this).data();
    var id = data.brokerId;
    $.ajax({
          url:'edit-broker/'+id,
          type:'GET',
          success:function(data){
            $('#brokerModal form').attr("action","update-broker/"+data.id);
            $('#brokerModalLabel').html('Edit Broker');
            $('#brokerModal #brokerName').val(data.name);
            $('#brokerModal #brokerNumber').val(data.mobile_number);
            $('#brokerModal #brokerModalButton').html('Update');
          }
    });
    $('#brokerModal').modal();
  });

   //BROKER PAYMENT SECTION
   //BROKER PAYMENT DUE CALCULATION
  $('body').on('blur','#brokerPaymentAdvance', function(e){debugger
      var total = parseInt($('#brokerPaymentModal #brokerPaymentTotalAmount').val().replace(/,/g, ''));
      var advance = parseInt($('#brokerPaymentModal #brokerPaymentAdvance').val());
      let advanceAlreadyGiven=parseInt($('#brokerAllAdvancePayment').val());
     if(Object.is(advanceAlreadyGiven, NaN)){
      var due = total-advance;
    }else{
      var due = total-advance-advanceAlreadyGiven;
    }
      if(total && advance) {
          $('#brokerPaymentModal #brokerPaymentDue').val(due);
        }
  });
  

  //EDIT BROKER'S PAYMENT 
  $('body').on('click','#editBrokerPayment', function(e){
    e.preventDefault();
    var data = $(this).data();
    var id = data.brokerpaymentId;
    $('#brokerAllAdvancePayment').val(data.totaladvance);
    $.ajax({
          url:'edit-brokerpayment/'+id,
          type:'GET',
          success:function(data){
            $('#brokerPaymentModal form').attr("action","insert-brokerpayment-record/"+data.id);
            $('#customerDueProjectName').attr('readonly',true);
            $('#brokerModalLabel').html('Add Broker Payment Record');
            $('#customerDueProjectName').val(data.project_id);
            $('#brokerPaymentModal #brokerPaymentName').val(data.broker_id).attr("readonly","readonly");
            // $('#brokerPaymentModal #brokerPaymentDate').val(data.payment_date.split("-").reverse().join("-")).attr("readonly","readonly");
            $('#brokerPaymentModal #brokerPaymentTotalAmount').val(data.total_amount.toLocaleString('en-IN')).attr("readonly", "readonly");
            // $('#brokerPaymentModal #brokerPaymentDue').val(data.due.toLocaleString('en-IN')).attr("readonly", "readonly");
          }
      });
  });

  //LAND OWNER PAYMENT SECTION
   //LAND OWNER PAYMENT DUE CALCULATION
    $('body').on('blur','#landOwnerPaymentPaid', function(e){
      var total = parseInt($('#landOwnerPaymentModal #landOwnerPaymentTotalAmount').val().replace(/,/g, ''));
      var advance = parseInt($('#landOwnerPaymentModal #landOwnerPaymentPaid').val());
      var advanceAlreadyGiven=parseInt($('#landOwnerAllAdvancePayment').val());
      if(Object.is(advanceAlreadyGiven, NaN)){
      var due = total-advance;
    }
    else{
      var due = total-advance-advanceAlreadyGiven;
    }
      if(total && advance) {
          $('#landOwnerPaymentModal #landOwnerPaymentDue').val(due.toLocaleString('en-IN'));
        }
    });

  //EDIT LAND OWNER PAYMENT 
  $('body').on('click','#editLandOwnerPayment', function(e){
    e.preventDefault();
    var data = $(this).data();
    var id = data.landownerpaymentId;
    $('#landOwnerAllAdvancePayment').val(data.totaladvance);
    $.ajax({
          url:'edit-landownerpayment/'+id,
          type:'GET',
          success:function(data){
            console.log(data);
            $('#landOwnerPaymentModal form').attr("action","insert-landownerpayment-record/"+data.id);
            $('#landOwnerPaymentModal #landOwnerPaymentName').val(data.party_name).attr('readonly','readonly');
            $('#customerDueProjectName').val(data.project_id);
            $('#landOwnerModalLabel').html('Add Land Owner Payment Record');
            $('#landOwnerPaymentModal #landOwnerPaymentDate').val(data.payment_date.split("-").reverse().join("-")).attr("readonly","readonly");
            $('#landOwnerPaymentModal #landOwnerPaymentTotalAmount').val(data.total_amount.toLocaleString('en-IN')).attr('readonly','readonly');
          }
      });
  });

// Dealer Edit
$('body').on('click','#editDealer', function(e){
  e.preventDefault();
  var data = $(this).data();
  var id = data.delearId;
  $.ajax({
        url:'edit-dealer/'+id,
        type:'GET',
        success:function(data){
          $('#dealerModal form').attr("action","update-dealer/"+data.id);
          $('#dealerModal #dealerName').val(data.name);
          $('#dealerModalLabel').html('Edit Dealer');
          $('#dealerModal #contactnumber').val(data.number);
          $('#dealerModal #address').val(data.address);
          $('#dealerModal #state').val(data.state);
          $('#dealerModal #dealerModalButton').html('Update');
        }
    });
});

$('body').on('click','#editMaterialChecklist', function(e){
  e.preventDefault();
  var data = $(this).data();
  var id = data.checklistId;
  $.ajax({
        url:'edit-material-checklist/'+id,
        type:'GET',
        success:function(data){
          $('#materialChecklist form').attr("action","update-material-checklist/"+data.id);
          $('#materialChecklist #partyName').val(data.get_dealer.id);
          $('#materialCheckListModalLabel').html('Edit Material Checklist');
          $('#materialChecklist #tradematerial').val(data.get_trade.id);
          $('#materialChecklist #quantity').val(data.quantity_received);
          $('#materialChecklist #deliverydate').val(data.delivery_date);
          $('#materialChecklist #paymentstatus').val(data.payment_done);
          $('#materialChecklist #billAmount').val(data.bill_amount);
          $('#materialChecklist #remarks').val(data.remarks);
          $('#materialChecklist #docimg').html('<img src="materialchecklistdocs/'+data.document_upload+'" width="150px">');
          $('#materialChecklist #ChecklistModalButton').html('Update');
        }
    });
});

//Edit Property Category
$('body').on('click','#editPropertyCategory', function(e){
  e.preventDefault();
  var data = $(this).data();
  var id = data.propertycategoryId;
  $.ajax({
        url:'edit-property-category/'+id,
        type:'GET',
        success:function(data){
          $('#PropertyCategoryModal #PropertyCategoryName').val(data.name);
          $('#propertyCategoryModalLabel').html('Edit Property Category');
          $('#PropertyCategoryModal form').attr("action","update-property-category/"+data.id);
          $('#PropertyCategoryModal #propertycategoryModalButton').html('Update');
        }
  });
  $('#PropertyCategoryModal').modal();
});

//Edit Property Status
$('body').on('click','#editPropertyStatus', function(e){
  e.preventDefault();
  var data = $(this).data();
  var id = data.propertystatusId;
  $.ajax({
        url:'edit-property-status/'+id,
        type:'GET',
        success:function(data){
          $('#PropertyStatusModal #PropertyStatusName').val(data.status_name);
          $('#PropertyStatusModal form').attr("action","update-property-status/"+data.id);
          $('#propertyStatusModalLabel').html('Edit Property Status');
          $('#PropertyStatusModal #propertystatusModalButton').html('Update');
        }
  });
  $('#PropertyStatusModal').modal();
});

//Edit Property List
$('body').on('click','#editPropertyList', function(e){
  e.preventDefault();
  var data = $(this).data();
  var id = data.propertylistId;
  $.ajax({
        url:'edit-property-list/'+id,
        type:'GET',
        success:function(data){
          $('#propertyModalLabel').html('Edit Property');
          $('#PropertyListModal #projectName').val(data.project_name);
          $('#PropertyListModal #productName').val(data.get_category.id);
          $('#PropertyListModal #status').val(data.get_status.id);
          $('#PropertyListModal #size').val(data.size);
          $('#PropertyListModal #price').val(data.price);
          $('#PropertyListModal #totalAmount').val(data.total_amount).attr('readonly',true);
          $('#PropertyListModal #gstInPercent').val(data.gst_rate);
          $('#total').val(parseInt(data.total_amount*data.gst_rate/100+data.total_amount)).attr('readonly',true);
          $('#PropertyListModal form').attr("action","update-property-list/"+data.id);
          $('#PropertyListModal #PropertyListModalButton').html('Update');
        }
  });
  $('#PropertyStatusModal').modal();
});

//GST Calculation in Property List
$('body').on('blur','#size', function(e){
   var size= $('#size').val();
   var price_persqareft =$('#price').val();
   if(size && price_persqareft){
    var totalprice=size * price_persqareft ;
    $('#totalAmount').val(parseInt(totalprice));
  }
 });
$('body').on('blur','#price', function(e){
   var size= $('#size').val();
   var price_persqareft =$('#price').val();
   if(size && price_persqareft){
    var totalprice=size * price_persqareft ;
    $('#totalAmount').val(parseInt(totalprice));
  }
 });
$('body').on('blur','#gstInPercent', function(e){
 let totalAmount=parseInt($('#totalAmount').val());
   var gstPecentage =parseInt($('#gstInPercent').val());
   if((totalAmount!="") && (gstPecentage!="")){
    var total =(totalAmount * gstPecentage/100)+totalAmount;
    $('#total').val(parseInt(total));
  }
 });

 $(".cost_qty").blur(function() {
  var cost= $("#cost").val();
  var qty=$("#qty").val();
  if(cost && qty){
   var price=cost*qty;
   $("#price").val(price);
  }
});

$('.tax').on('click',function(){
  if ($('#igst').val()!=''){
  $('.tax').attr('readonly',true);
}
else{
  $('#igst').attr('readonly',true);
  $('.tax').attr('readonly',false);
}
});

$('#igst').on('click',function(){
  if(($('#sgst').val() || $('#cgst').val()) !=''){
    $('#igst').attr('readonly',true);
  }
  else{
    $('#igst').attr('readonly',false);
    $('.tax').attr('readonly',true);
  }
  
});

// GST  Calculation
$("#igst").blur(function() {
  getGstWithPrice();
});
$("#sgst").blur(function() {
  if($('#cgst').val()!=''){
  getGstWithPrice();
}
});
$("#cgst").blur(function() {
  if($('#sgst').val()!=''){
    getGstWithPrice();
  }
});
function getGstWithPrice(){
    var price=parseInt($('#price').val());
  if($('#igst').val()!=''){
    var igst=parseInt($('#igst').val());
    var taxamount=price * igst/100 ;
    var totalamount=price + taxamount;
    var subtotal=price+taxamount;
  $('#totalprice').val(parseInt(totalamount));
  $('#subtotal').text('Subtotal :  ' + price);
  $('#tax').text('Tax Amount : ' + taxamount);
  $('#total').text('Total : ' + parseInt(totalamount));
  }
  else{
    var sgst=parseInt($('#sgst').val());
    var cgst=parseInt($('#cgst').val());
   var taxamount=(price * sgst/100)+(price * cgst/100);
   var totalamount=price + taxamount;
   $('#totalprice').val(parseInt(totalamount));
   $('#subtotal').text('Subtotal : ' + price);
   $('#tax').text('Tax Amount : ' + taxamount);
   $('#total').text('Total : ' + parseInt(totalamount));
  }
}
//GST Bill Edit
$('body').on('click','#editGstBill', function(e){
  e.preventDefault();
  var data = $(this).data();
  var id = data.gstbillId;
  $.ajax({
        url:'edit-gst-bill/'+id,
        type:'GET',
        success:function(data){
          $('#GstBillModal form').attr("action","update-gst-bill/"+data.id);
          $('#GstBillModal #billnumber').val(data.bill_number);
          $('#gstBillModalLabel').html('Edit GST Bill');
          $('#GstBillModal #billdate').val(data.date);
          $('#GstBillModal #partyname').val(data.party_name);
          $('#GstBillModal #gstnumber').val(data.gst_number);
          $('#GstBillModal #amount').val(data.amount);
          $('#GstBillModal #sgst').val(data.sgst);
          $('#GstBillModal #cgst').val(data.cgst);
          $('#GstBillModal #igstingstregister').val(data.igst);
          $('#GstBillModal #totalamount').val(data.total_amount
            );
          $('#GstBillModal #gstbillModalButton').html('Update');
        }
    });
  });

  //CUSTOMER DUE CALCULATION
  $('body').on('blur','#CustomerDueAdvance', function(e){
  var total = parseInt($('#customerDueModal #CustomerDueTotalAmount').val().replace(/,/g, ''));
  var advance = parseInt($('#customerDueModal #CustomerDueAdvance').val());
  var due = total-advance;
  if(total && advance) {
      $('#customerDueModal #CustomerDue-Due').val(due);
    }
  });

  $('body').on('blur','#CustomerDueTotalAmount', function(e){
    var total = $('#customerDueModal #CustomerDueTotalAmount').val();
    var advance = $('#customerDueModal #CustomerDueAdvance').val();
    var due = total-advance;
    if(total && advance) {
        $('#customerDueModal #CustomerDue-Due').val(due);
      }
  });

//EDIT CUSTOMER DUE
$('body').on('click','#editcustomerDue', function(e){
  e.preventDefault();
  var data = $(this).data();
  var id = data.customerdueId;
  $.ajax({
        url:'edit-customer-due/'+id,
        type:'GET',
        success:function(data){
          $('#customerDueModal form').attr("action","insert-customer-due-record/"+data.id);
          $('#customerDueModal #customerDueName').val(data.customer_id).attr("readonly","readonly");
          $('#customerDueModal #customerDueProjectName').val(data.project_id).attr("readonly","readonly");
          $('#customerDueModal #CustomerDueTotalAmount').val(data.get_customer_due_record[0].total_amount);
        }
  });
  $('#customerDueModal').modal();
});

//EDIT SALARY
$('body').on('click','#editSalary', function(e){
  e.preventDefault();
  var data = $(this).data();
  var id = data.salaryId;
  $.ajax({
        url:'edit-salary/'+id,
        type:'GET',
        success:function(data){
          $('#employee_id').val(data.employee_id);
          $('#date').val(data.date.split("-").reverse().join("-"));
          $('#salary_amount').val(data.salary_amount);
          $('#salary_advance').val(data.salary_advance);
          $('#balance').val(data.balance);
          $('#remark').val(data.remark);
          $('#SalaryModal form').attr("action","update-salary/"+data.id);
          $('#SalaryModalbutton').html('Update');
        }
  });
  $('#SalaryModal').modal();
});
// Odisha State Selected at time of state dropdown load
  $('#state').val(21).attr("selected",true);

  // $('#description').on('blur',function(){
  //   ('#descrip').text($('#description').text())
  // });
});

