var jsonObject = '[{"name": "Default","rows": [{"message": "Invested Amount","entity": "Research","attribute": "Segment"}, {"message": "Sum of Amount ","entity": "Clients","attribute": "Profile"}]},{"name": "SMS","rows": [{"message": "SMS_Alert1","entity": "Portfolio Overall","attribute": "scrip Gain"},{"message": "SMS Alert 2","entity": "MarketSnapShotEvery5Min","attribute": "Invested Amount"}]}]';

	// var f1 = null; f2 = null, selected = null;
	var entities = '{"Select":"Select", "Research":"Research", "Clients":"Clients", "Portfolio scrip":"Portfolio scrip", "Leadger":"Leadger", "Portfolio Overall":"Portfolio Overall", "MarketSnapShotEvery5Min": "MarketSnapShotEvery5Min" , "PortfolioScripMaster":"PortfolioScripMaster"}';
	var attributes = '{"Select":"Select" ,"scrip" : "scrip" , "Invested Amount" : "Invested Amount", "LTP" : "LTP", "NetAvgPrice" : "NetAvgPrice" , "scripValidation" : "scripValidation", "ClientId" : "ClientId", "Profile" : "Profile" , "Segment" :"Segment", "Trade Gain/Loss" : "Trade Gain/Loss" , "Client Name" : "Client Name", "scrip Gain" : "scrip Gain", "scrip group" : "scrip group"}';

$(document).ready(function() {

	var selectedOption = null;
	$("#optionTable").delegate(".channelButton", "click", function() {
	selectedOption = $("#msgchannels option:selected").text();	
	var rowCount = $("#templateTable >tbody >tr").length;
	console.log("Row Count :" +rowCount);
	var headerStart = '<tr><td><table id="'+selectedOption+"table"+'"><thead id='+selectedOption +'>' + selectedOption + '</thead>';
	var content = headerStart +'<tr><td style="150px"><input id="'+selectedOption+"tablemessage"+rowCount +'" type="text" size="20" /></td><td><select style="width:150px;" id="'+selectedOption+"tableentity"+rowCount +'"></select></td><td><select style="width:150px;" id="'+selectedOption+"tableattribute"+rowCount +'"></select></td>'
					     + '<td><button class="addrows" onclick=addrows("'+selectedOption+"table"+'");>+</button></td>&nbsp;' 
					     + '<td><button class="delrows">-</button></td>&nbsp;'
					     + '</tr></table></td></tr>';
	$("#templateTable").append(content);
	var $select = $('#'+selectedOption+"entity"+rowCount); 
		$select.find('option').remove();  
		$.each(JSON.parse(entities),function(key, value) {
			 $select.append('<option value="' + value + '">' + value + '</option>');
		});
	var $select = $('#'+selectedOption+"attribute"+rowCount); 
		$select.find('option').remove();  
		$.each(JSON.parse(attributes),function(key, value) {
			$select.append('<option value="' + value + '">' + value + '</option>');   
		});
	});

	$("#templateTable").delegate(".addrows", "click", function() {
		var rowCount = $("#"+selectedOption+"table >tbody >tr").length;
		console.log("The Row Count in addrows " + rowCount);
		var content = '<tr><td style="150px"><input id="'+selectedOption+"message"+rowCount+'" type="text" size="20" /></td><td><select style="width:150px;" id="'+selectedOption+"entity"+rowCount+'"></select></td><td><select style="width:150px;"  id="'+selectedOption+"attribute"+rowCount+'">'
						 + '</select></td>'
						 + '<td><button class="addrows" onclick="addrows('+selectedOption+"table"+');">+</button></td>&nbsp;' 
					     + '<td><button class="delrows" onclick="delrows('+selectedOption+"table"+');">-</button></td>&nbsp;'
					     + '</tr>';
		$(this).closest("tr").after(content);
		var $select = $('#'+selectedOption+"entity"+rowCount); 
		$select.find('option').remove();  
		$.each(JSON.parse(entities),function(key, value) {
			 $select.append('<option value="' + value + '">' + value + '</option>');
		});
		var $select = $('#'+selectedOption+"attribute"+rowCount); 
			$select.find('option').remove();  
			$.each(JSON.parse(attributes),function(key, value) {
				$select.append('<option value="' + value + '">' + value + '</option>');   
			});
		
  	});

 	$("#templateTable").delegate(".delrows", "click", function() {
 		$(this).parent().parent().remove();
 	});

 	$(function() {
		var jsonParse = JSON.parse(jsonObject);
		var headerStart = "";
		var content = "";
		for(var i=0; i<jsonParse.length; i++) {
			headerStart = '<tr><td><table id="'+jsonParse[i].name+"table"+'"><thead id='+jsonParse[i].name +'>' + jsonParse[i].name + '</thead>';
			$("#templateTable").append(headerStart);
			for(var j=0; j<jsonParse[i].rows.length; j++) {
				content = '<tr><td style="150px"><input id="'+ jsonParse[i].name+"tablemessage"+j+'" type="text" size="20" value="'+ jsonParse[i].rows[j].message + '" /></td><td><select id="'+ jsonParse[i].name+"tableentity"+j +'" style="width:150px;">' + '<option value=""></option>' + '</select></td><td><select id="'+ jsonParse[i].name +"tableattribute"+j +'"  style="width:150px;">' + '<option value=""></option>'
							 + '</select></td>'
						     + '<td><button class="addrows" onclick=addrows("'+jsonParse[i].name+"table"+'");>+</button></td>&nbsp;' 
					     + '<td><button class="delrows">-</button></td>&nbsp;'
						     + '</tr>';	
		     $("#"+jsonParse[i].name+"table").append(content);

		     var $select = $('#'+jsonParse[i].name+"tableentity"+j); 
	 				$select.find('option').remove();  
	 				$select.append('<option value=-1>Category(All)</option>');
	 				$.each(JSON.parse(entities),function(key, value) {
	 					if(value === jsonParse[i].rows[j].entity) {
	 					    $select.append('<option selected value="' + value + '">' + value + '</option>');
	 					}else{
	 						 $select.append('<option value="' + value + '">' + value + '</option>');
	 					}    
	 				});
	 			var $select = $('#'+jsonParse[i].name+"tableattribute"+j); 
	 				$select.find('option').remove();  
	 				$select.append('<option value=-1>Category(All)</option>');	
	 				$.each(JSON.parse(attributes),function(key, value) {
	 					if(value === jsonParse[i].rows[j].attribute) {
	 					    $select.append('<option selected value="' + value + '">' + value + '</option>');
	 					}else{
	 						 $select.append('<option value="' + value + '">' + value + '</option>');
	 					}    
	 				});
		     
			}
			$("#templateTable").append("</table></td></tr>");
		}	
	});		
 });

function addrows(tableId) {
		var rowCount = $("#"+tableId+" >tbody >tr").length;
		console.log("tableId Row" + rowCount);
 		var content = '<tr><td><input id="'+tableId+"message"+rowCount+'" type="text" size="20" /></td><td><select style="width:150px;" id="'+tableId+"entity"+rowCount+'"></select></td><td><select style="width:150px;"  id="'+tableId+"attribute"+rowCount+'">'
						 + '</select></td>'
						 + '<td><button class="addrows" onclick=addrows("'+tableId+'");>+</button></td>&nbsp;' 
					     + '<td><button class="delrows">-</button></td>&nbsp;'
					     + '</tr>';

		$("#"+tableId+" >tbody >tr:last").after(content);
		var $select = $('#'+tableId+"entity"+rowCount); 
		$select.find('option').remove();  
		$.each(JSON.parse(entities),function(key, value) {
			 $select.append('<option value="' + value + '">' + value + '</option>');
		});
		var $select = $('#'+tableId+"attribute"+rowCount); 
		$select.find('option').remove();  
		$.each(JSON.parse(attributes),function(key, value) {
			$select.append('<option value="' + value + '">' + value + '</option>');   
		});
 	}
