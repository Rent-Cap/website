
const clauses = {
    "type": "OR",
    "clauses": [
        {
            "type": "NOT",
            "clause": {
                "type": "AND",
                "caluses": [
                    {
                        "type": "clause",
                        "name": "Alienable Seperable",
                    },
                    { "type": "NOT",
                    "clause": {"type": "clause", "name": "Corporate Ownership" },
                    {"type":"clause", "name":"Notice Sent"}
                ]
            }
        },
        {
            "type": "NOT",
            "clause": {"type":"clause","name":"Govt Housing"}
        },
        {
            "type":"NOT",
            "clause": {
                "type":"clause",
                "name":"Local Rent Cap"
            }
        },
        {
            "type": "NOT",
            "clause": {
                "type": "clause with vars",
                "name": "Certificate of Occupancy",
                "vars": {
                    "range": "-15y"
                }
            }
        },
        {
        "type":"NOT",
        "clause": {
            "type":"AND",
            "clauses": [
                    {"type":"clauses","name":"Duplex"},
                    {"type":"clause with vars",
                    "name": "owner occupy",
                    "vars":{"clause var": "start of lease"}
                    {"type":"clause with vars",
                    "name": "owner occupy",
                    "vars":{"ongoing": "true"}
                    }
                ]
            }
        }
    ]
}