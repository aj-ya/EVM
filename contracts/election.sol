    // SPDX-License-Identifier: GPL-3.0
    pragma solidity ^0.8.7;

    contract Election {
        struct Candidate {
            string name;
            uint256 voteCount;
        }
        struct Voter {
            uint256 votedTo;
            address sender;
        }
        address public admin;
        Voter[] voted;
        Candidate[] candidates;
        bool public electionStarted;

        constructor() {
            admin = msg.sender;
            electionStarted = false;
        }

        function addCandidates(string[] memory _candidates) public{
            require(electionStarted == false, "Election Already Started");
            for (uint256 i = 0; i < _candidates.length; i++) {
                candidates.push(Candidate(_candidates[i], 0));
            }
        }
        function getCandidates() public view returns(Candidate[] memory){
            return candidates;
        }

        function commenceElection() public {
            require(electionStarted == false, "Election Already Started");
            electionStarted = true;
        }

        function concludeElection() public {
            require(electionStarted == true, "Election Not Started");
            electionStarted = false;
        }

        function clearElection() public {
            require(
                electionStarted == false,
                "Election in progress.Conclude it and then try again later"
            );
            delete candidates;
            delete voted;
        }

        function checkVoted(address from) public view returns(bool) {
            bool check = false;
            for (uint256 i = 0; i < voted.length; i++) {
                if (voted[i].sender == from) {
                    check = true;
                    break;
                }
            }
            return check;
        }

        function Vote(string memory choice) public{
            require(checkVoted(msg.sender) == false, "Person has already voted.");
            for (uint256 i = 0; i < candidates.length; i++) {
                if (keccak256(abi.encodePacked(choice))== keccak256(abi.encodePacked(candidates[i].name))) {
                    candidates[i].voteCount++;
                    voted.push(Voter(i, msg.sender));
                    break;
                }
            }
        }
        // function getResults(string memory _candidate) public view returns (uint256){
        //     uint256 votes=0;
        //     for(uint256 i=0;i<candidates.length;i++){
        //         if(keccak256(abi.encodePacked(candidates[i].name)) == keccak256(abi.encodePacked(_candidate)))
        //             votes=candidates[i].voteCount;
        //             break;
        //     }
        //     return votes;
        // }
    }
