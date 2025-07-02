class WasherUpdate {
    result "turn_off" | "share_info" | "do_nothing"
}

function HandleWasher(washer: string, query: string) -> WasherUpdate {
  client CerebrasQwen3  
  prompt #"
    You are a home assistant.

    You are given the state of the washer and a user's message.
    If the user just asks for current information, simply return with result: share_info.
    Only turn the washer off if the user specifically asks you to.

    You have the following washer:
    {{ washer }}

    {{ ctx.output_format }}

    {{ _.role("user") }}
    {{ query }}
  "#
}

test test_washer {
  functions [HandleWasher]
  args {
    washer "Finishes in: 5 minutes"
    query "how much longer will it take to finish?"
  }
}
