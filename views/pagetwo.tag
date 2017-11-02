<pagetwo>
	<div class='card'>
		<div class='content'>
			<form>
				<label for='name-input'>Enter a todo</label>
				<input type='text' id='name-input'/>
				<input type='button' value='Add' />
			</form>
		</div>
		<div class="content right-align">
			<input type='button' onclick={ pageRedirect } value='Return to page 1'/>
		</div>
	</div>
	<style type='scss'>
		@import 'styles/pagetwo';
	</style>
	<script src="presenters/pagetwo.js"></script>
</pagetwo>