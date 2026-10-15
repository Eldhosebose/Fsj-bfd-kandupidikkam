function isUnlocked(){ return localStorage.getItem('fsj_unlocked') === 'yes'; }
function openPayModal(){ document.getElementById('payModal').classList.add('open'); }
function closePayModal(){ document.getElementById('payModal').classList.remove('open'); }
// Revoked codes - these will no longer work for new unlocks
var REVOKED_CODES = ['FSJ-NOWX-HXUC'];
function unlockWithCode(){
  const code=document.getElementById('unlockCode').value.trim().toUpperCase();
  // Check if code has been revoked
  if(REVOKED_CODES.indexOf(code) !== -1){
    alert('This code has been revoked. Please contact support.');
    return;
  }
  const pattern = /^FSJ-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  if(pattern.test(code)){
    let sum = 0;
    for(let i=4; i<code.length; i++){
      const c = code[i];
      if(c !== '-'){
        sum += c.charCodeAt(0);
      }
    }
    if(sum % 7 === 0){
      localStorage.setItem('fsj_unlocked', 'yes');
      localStorage.setItem('fsj_unlock_code', code);
      closePayModal();
      if(typeof renderGrid === 'function') renderGrid();
      alert('🎉 Unlocked! You now have access to all contacts.');
      return;
    }
  }
  alert('Invalid code. Please check the code you received after payment.');
}
function generateCode(prefix){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  prefix = (prefix || '').toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0,4).padEnd(4, 'X');
  for(let attempt=0; attempt<100; attempt++){
    let suffix = '';
    for(let i=0; i<4; i++){
      suffix += chars[Math.floor(Math.random() * chars.length)];
    }
    const code = 'FSJ-' + prefix + '-' + suffix;
    let sum = 0;
    for(let i=4; i<code.length; i++){
      const c = code[i];
      if(c !== '-'){ sum += c.charCodeAt(0); }
    }
    if(sum % 7 === 0){
      return code;
    }
  }
  return null;
}
