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
  }
}

module.exports = { Message };
