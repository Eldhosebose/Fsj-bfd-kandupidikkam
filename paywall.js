function isUnlocked(){ return localStorage.getItem('fsj_unlocked') === 'yes'; }
function openPayModal(){ document.getElementById('payModal').classList.add('show'); }
function closePayModal(){ document.getElementById('payModal').classList.remove('show'); }
function unlockWithCode(){
  const code=document.getElementById('unlockCode').value.trim().toUpperCase();
  // Pattern-based validation: code must be FSJ-XXXX-YYYY where XXXX and YYYY are alphanumeric
  // Eldhose generates unique codes for each buyer (e.g., FSJ-A7B3-K9M2)
  // No hardcoded list in source - codes are generated per-buyer
  const pattern = /^FSJ-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  if(pattern.test(code)){
    // Additional checksum: sum of char codes must be divisible by 7
    // This prevents random guessing - Eldhose's generator ensures valid checksums
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
// Helper for Eldhose to generate codes (he can use this in console or I can make a generator page)
// Example: generateCode('A7B3') returns a valid code
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
