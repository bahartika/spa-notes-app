import React from "react";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/network-data";
import { useParams, useNavigate } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import PropTypes from "prop-types";

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <DetailPage id={id} navigate={navigate} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  async componentDidMount() {
    const { error, data } = await getNote(this.props.id);
    if (!error) {
      this.setState({ note: data });
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      const { error, data } = await getNote(this.props.id);
      if (!error) {
        this.setState({ note: data });
      }
    }
  }

  async onDeleteHandler() {
    await deleteNote(this.props.id);
    this.setState({ note: null }, () => {
      this.props.navigate("/");
    });
  }

  async onArchiveHandler() {
    await archiveNote(this.props.id);
    const { error, data } = await getNote(this.props.id);
    if (!error) {
      this.setState({ note: data });
    }
    this.props.navigate("/");
  }

  async onUnarchiveHandler() {
    await unarchiveNote(this.props.id);
    const { error, data } = await getNote(this.props.id);
    if (!error) {
      this.setState({ note: data });
    }
    this.props.navigate("/");
  }

  render() {
    if (!this.state.note) {
      return <p>Tidak ada catatan...</p>;
    }

    return (
      <div className="note-detail">
        <NoteDetail {...this.state.note} onDelete={this.onDeleteHandler} onUnarchive={this.onUnarchiveHandler} onArchive={this.onArchiveHandler} />
      </div>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailPageWrapper;
