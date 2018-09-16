$(function(){
	let $lis=$('.navbar-container>li')
	for(let i=0;i<$lis.length;i++){
		$lis.eq(i).on('click',function(e){
			let $li=$(e.currentTarget)
			$li.addClass('active')
				.siblings('.active').removeClass('active')
		})
	}
})