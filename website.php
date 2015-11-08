<?php
/*SportAnticipation~ @ENOXH 2015*/

require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}
require_once("models/header.php");
?>

<body>
<div class="container">    
<div class="row">
<?php include_once('top_nav.php');     ?>
</div>  <!--row-->   
<div class="row">   
<h2>This controls what shows up on the home page.</h2>
  <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo">
 View Row Index
</button>

<div id="demo" class="collapse ">
 1 block header<br/>
2 block header<br/>
3 block header<br/>
4 block header<br/>
5 block header<br/>
6 block header<br/>
7 block header<br/>
8 facebook<br/>
9 twitter<br/>
10 soundcloud<br/>
11 Shows 1<br/>
12 Shows 2<br/>
13 Artists<br/>
14 support tagline<br/>
15 copyright<br/>
16 carousel image 1<br/>
17 carousel image 2<br/>
18 carousel image 3<br/>
19 carousel image 4<br/>
20 video 1<br/>
21 video 2<br/>
22 video 3<br/>
23 video 4<br/>
24 video 5<br/>
25 - 40 audio tracks<br/>
41 -46 merch   <br/><br/> 
</div>  

    
<?php

	require_once('preheader.php'); // <-- this include file MUST go first before any HTML/output

	#the code for the class
	include ('ajaxCRUD.class.php'); // <-- this include file MUST go first before any HTML/output

    #this one line of code is how you implement the class
    ########################################################
    ##

    $tblDemo = new ajaxCRUD("Item", "st_pagedata", "pd_id", "/");

    ##
    ########################################################

    ## all that follows is setup configuration for your fields....
    ## full API reference material for all functions can be found here - http://ajaxcrud.com/api/
    ## note: many functions below are commented out (with //). note which ones are and which are not

    #i can define a relationship to another table
    #the 1st field is the fk in the table, the 2nd is the second table, the 3rd is the pk in the second table, the 4th is field i want to retrieve as the dropdown value
    #http://ajaxcrud.com/api/index.php?id=defineRelationship
    //$tblDemo->defineRelationship("fkID", "tblDemoRelationship", "pkID", "fldName", "fldSort DESC"); //use your own table - this table (tblDemoRelationship) not included in the installation script

    #i don't want to visually show the primary key in the table
    //$tblDemo->omitPrimaryKey();

    #the table fields have prefixes; i want to give the heading titles something more meaningful
     $tblDemo->displayAs("pd_id", "Row");
    $tblDemo->displayAs("pd_data", "Page Item");


	#set the textarea height of the longer field (for editing/adding)
    #http://ajaxcrud.com/api/index.php?id=setTextareaHeight
    //$tblDemo->setTextareaHeight('fldLongField', 150);

    #i could omit a field if I wanted
    #http://ajaxcrud.com/api/index.php?id=omitField
    //$tblDemo->omitField("fldField2");

    #i could omit a field from being on the add form if I wanted
    //$tblDemo->omitAddField("fldField2");

    #i could disallow editing for certain, individual fields
    //$tblDemo->disallowEdit('fldField2');

    #i could set a field to accept file uploads (the filename is stored) if wanted
    //$tblDemo->setFileUpload("poster", "uploads/");

    #i can have a field automatically populate with a certain value (eg the current timestamp)
    //$tblDemo->addValueOnInsert("fldField1", "NOW()");

    #i can use a where field to better-filter my table
    //$tblDemo->addWhereClause("WHERE (fldField1 = 'test')");

    #i can order my table by whatever i want
    //$tblDemo->addOrderBy("ORDER BY fldField1 ASC");

    #i can set certain fields to only allow certain values
    #http://ajaxcrud.com/api/index.php?id=defineAllowableValues
    //$allowableValues = array("Allowable Value1", "Allowable Value2", "Dropdown Value", "CRUD");
   // $tblDemo->defineAllowableValues("fldCertainFields", $allowableValues);

    //set field fldCheckbox to be a checkbox
    //$tblDemo->defineCheckbox("fldCheckbox");

    #i can disallow deleting of rows from the table
    #http://ajaxcrud.com/api/index.php?id=disallowDelete
   $tblDemo->disallowDelete();

    #i can disallow adding rows to the table
    #http://ajaxcrud.com/api/index.php?id=disallowAdd
    //$tblDemo->disallowAdd();

    #i can add a button that performs some action deleting of rows for the entire table
    #http://ajaxcrud.com/api/index.php?id=addButtonToRow
    //$tblDemo->addButtonToRow("Add", "add_item.php", "all");

    #set the number of rows to display (per page)
    $tblDemo->setLimit(100);

	#set a filter box at the top of the table
    //$tblDemo->addAjaxFilterBox('fldField1');

    #if really desired, a filter box can be used for all fields
    //style$tblDemo->addAjaxFilterBoxAllFields();

    #i can set the size of the filter box
    //$tblDemo->setAjaxFilterBoxSize('fldField1', 3);

	#i can format the data in cells however I want with formatFieldWithFunction
	#this is arguably one of the most important (visual) functions
	//$tblDemo->formatFieldWithFunction('fldField1', 'makeBlue');
	//$tblDemo->formatFieldWithFunction('fldField2', 'makeBold');

	//$tblDemo->modifyFieldWithClass("fldField1", "zip required"); 	//for testing masked input functionality
	//$tblDemo->modifyFieldWithClass("fldField2", "phone");			//for testing masked input functionality

	//$tblDemo->onAddExecuteCallBackFunction("mycallbackfunction"); //uncomment this to try out an ADD ROW callback function

	$tblDemo->deleteText = "delete";

?>
		<div style="float: left">
			Total Returned Rows: <b><?=$tblDemo->insertRowsReturned();?></b><br />
		</div>

		<div style="clear:both;"></div>

<?php

	#actually show the table
	$tblDemo->showTable();

	#my self-defined functions used for formatFieldWithFunction
	function makeBold($val){
		if ($val == "") return "no value";
		return "<b>$val</b>";
	}

	function makeBlue($val){
		return "<span style='color: blue;'>$val</span>";
	}

	function myCallBackFunction($array){
		echo "THE ADD ROW CALLBACK FUNCTION WAS implemented";
		print_r($array);
	}
?>    








</div> <!--row-->       

   







<div class="footer"><?php echo $bandbase->header15; ?></div>
</div><!--container-->   
</body>
</html>




