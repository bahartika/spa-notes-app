import React from "react";
import { getArchivedNotes } from "../utils/network-data";
import { useSearchParams } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import NoteList from "../components/NoteList";
import PropTypes from "prop-types";
import LocaleContext from "../Context/LocaleContext";

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }
  return <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class ArchivePage extends React.Component {
  static contextType = LocaleContext;

  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || "",
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { error, data } = await getArchivedNotes();
    if (!error) {
      this.setState({ notes: data });
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.defaultKeyword !== this.props.defaultKeyword) {
      const { error, data } = await getArchivedNotes();
      if (!error) {
        this.setState({ notes: data });
      }
    }
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    if (this.props.keywordChange) {
      this.props.keywordChange(keyword);
    }
  }

  render() {
    const filteredNotes = this.state.notes.filter((note) => {
      return note.title.toLowerCase().includes(this.state.keyword.toLowerCase());
    });

    return (
      <section>
        <h2>{this.context.locale === "id" ? "Catatan Arsip" : "Archive notes"}</h2>
        <SearchInput keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        <NoteList notes={filteredNotes} />
      </section>
    );
  }
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func,
};

export default ArchivePageWrapper;
