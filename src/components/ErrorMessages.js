import { Block, Notification, Button } from "react-bulma-components";

const ErrorMessages = ({messages, handleClearMessages}) => {
	if (!Array.isArray(messages) || !messages.length) {
		return;
	}

	return (
		<Block>
			<Notification color="danger" light={true}>
				{messages.map((message, index) =>
					<p key={index}>{message}</p>
				)}
				<Button remove onClick={handleClearMessages}/>
			</Notification>
		</Block>
	)
}

export default ErrorMessages;