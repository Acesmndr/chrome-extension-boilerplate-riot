<pageone>
	<div class='card'>
		<div class='content'>
			<div class='graphic'>
				<div class='title'>Chrome Extension Boilerplate</div>
				<img class='illustration' src='assets/img/illustration.svg' />
				<div class='author'>acesmndr@gmail.com</div>
			</div>
		</div>
		<div class='content right-align'>
			<input type='button' onclick={ getAjaxDataFromBackground } value='Send Data Request'/>
			<input type='button' onclick={ goToSecondPage } value='Go to page 2'/>
		</div>
	</div>
	<style type='scss'>
		@import 'styles/pageone';
	</style>
	<script src="presenters/pageone.js"></script>
</pageone>