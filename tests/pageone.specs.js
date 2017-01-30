describe('page one spec', function() {
	beforeEach(function () {
    var html = document.createElement('pageone');
    document.body.appendChild(html);
  	route = function(arg){};
  });
	it('should mount a pageone tag', function() {
    tag = riot.mount('pageone')[0];  
    expect(tag).to.exist;
    expect(tag.isMounted).to.be.true;
  });
  it('should have a button', function() {
  	var routeSpy = sinon.spy(route);
  	document.querySelector("input[type=button]").click();
  	assert.ok(routeSpy.calledWith('pagetwo'),'Routed to pagetwo');
  });
  after(function(){
    chrome.flush();
  });
})