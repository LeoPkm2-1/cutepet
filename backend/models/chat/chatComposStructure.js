class Message {
  static NEW_MESSAGE_COMMING_EVENT = "NEW_MESSAGE_COMMING";
  constructor(
    sender_id,
    receiver_id,
    message_type,
    message_content,
    create_at = new Date(),
    is_seen = false
  ) {
    this.senderID = sender_id;
    this.receiverID = receiver_id;
    this.messageType = message_type;
    this.messageContent = message_content;
    this.createAt = create_at;
    this.isSeen = is_seen;
    this.conversationBetween = this.constructor.getNameOfConversationBetween(
      sender_id,
      receiver_id
    );
  }

  static getNameOfConversationBetween(sender_id, receiver_id) {
    sender_id = parseInt(sender_id);
    receiver_id = parseInt(receiver_id);
    let smaller = sender_id < receiver_id ? sender_id : receiver_id;
    let bigger = sender_id > receiver_id ? sender_id : receiver_id;
    return `conversation_${smaller}_${bigger}`;
  }
}


module.exports = { Message };
