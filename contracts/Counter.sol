pragma solidity 0.5.12;

contract Counter {
  uint256 internal count;

  event CountedTo(uint256 number);

  function countUp() public returns (uint256) {
    uint256 newCount = count + 1;
    require(newCount > count, "Uint256 overflow");

    count = newCount;

    emit CountedTo(count);
    return count;
  }

  function countDown() public returns (uint256) {
    uint256 newCount = count - 1;
    require(newCount < count, "Uint256 underflow");

    count = newCount;

    emit CountedTo(count);
    return count;
  }

  function getCount() public view returns (uint256) {
    return count;
  }
}
