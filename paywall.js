
function isUnlocked(){ return localStorage.getItem('fsj_unlocked') === 'yes'; }
function openPayModal(){ document.getElementById('payModal').classList.add('show'); }
function closePayModal(){ document.getElementById('payModal').classList.remove('show'); }
function unlockWithCode(){
  const code=document.getElementById('unlockCode').value.trim();
  const validCodes = ['FSJ2026', 'FSJUNLOCK2026', 'ELDHOSE499'];
  if(validCodes.includes(code)){
    localStorage.setItem('fsj_unlocked', 'yes');
    closePayModal();
    renderGrid();
    alert('🎉 Unlocked! You now have access to all contacts.');
  } else {
    alert('Invalid code. Please check the code you received after payment.');
  }
}
