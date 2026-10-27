
import React, { Component } from "react";
import "./App.css";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div style={styles.task}>
      <span
        onClick={onToggle}
        style={{
          ...styles.taskText,
          textDecoration: task.done ? "line-through" : "none",
          color: task.done ? "#94a3b8" : "#1e293b",
        }}
      >
        {task.done ? "✅ " : "⭕ "}
        {task.text}
      </span>

      <button
        onClick={onDelete}
        style={styles.delete}
      >
        🗑️
      </button>
    </div>
  );
}

export default class App extends Component {
  state = {
    text: "",
    tasks: [],
  };

  addTask = () => {
    const text = this.state.text.trim();
    if (!text) return;

    this.setState({
      tasks: [
        ...this.state.tasks,
        { id: Date.now(), text, done: false },
      ],
      text: "",
    });
  };

  toggleTask = (id) => {
    this.setState({
      tasks: this.state.tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      ),
    });
  };

  deleteTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter(
        (task) => task.id !== id
      ),
    });
  };

  render() {
    const { text, tasks } = this.state;
    const completed = tasks.filter((t) => t.done).length;
    const progress = tasks.length
      ? (completed / tasks.length) * 100
      : 0;

    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.icon}>✦</div>

          <h1 style={styles.heading}>My Tasks</h1>
          <p style={styles.subtitle}>
            Small steps, big achievements.
          </p>

          <div style={styles.inputArea}>
            <input
              style={styles.input}
              value={text}
              onChange={(e) =>
                this.setState({ text: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") this.addTask();
              }}
              placeholder="What needs to be done?"
            />

            <button
              onClick={this.addTask}
              style={styles.addButton}
            >
              + Add
            </button>
          </div>

          <div style={styles.summary}>
            <span>YOUR PROGRESS</span>
            <strong>
              {completed}/{tasks.length} completed
            </strong>
          </div>

          <div style={styles.progressBg}>
            <div
              style={{
                ...styles.progress,
                width: `${progress}%`,
              }}
            />
          </div>

          <h3 style={styles.sectionTitle}>Today's list</h3>

          {tasks.length === 0 ? (
            <div style={styles.empty}>
              <div style={{ fontSize: 42 }}>📝</div>
              <strong>No tasks yet!</strong>
              <p>Add your first task to get started.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => this.toggleTask(task.id)}
                onDelete={() => this.deleteTask(task.id)}
              />
            ))
          )}

          {tasks.length > 0 && completed === tasks.length && (
            <p style={styles.congrats}>
              🎉 Amazing! All tasks completed!
            </p>
          )}

          <p style={styles.footer}>
            MADE WITH ♥ · ONE TASK AT A TIME
          </p>
        </div>
      </div>
    );
  }
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #fdf2f8, #ecfeff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 16px",
    fontFamily: "Segoe UI, Arial, sans-serif",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    background: "#ffffff",
    padding: "32px",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(79, 70, 229, 0.13)",
    boxSizing: "border-box",
  },
  icon: {
    width: "48px",
    height: "48px",
    margin: "0 auto 12px",
    background: "#eef2ff",
    color: "#4f46e5",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
  },
  heading: {
    textAlign: "center",
    color: "#1e1b4b",
    fontSize: "32px",
    margin: "8px 0",
  },
  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: "28px",
  },
  inputArea: {
    display: "flex",
    gap: "10px",
    marginBottom: "28px",
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: "14px",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    outline: "none",
    fontSize: "14px",
  },
  addButton: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "0 18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  summary: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
    fontSize: "12px",
    color: "#64748b",
    marginBottom: "10px",
  },
  progressBg: {
    height: "7px",
    background: "#eef2ff",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "28px",
  },
  progress: {
    height: "100%",
    background: "linear-gradient(90deg, #6366f1, #c084fc)",
    borderRadius: "10px",
    transition: "width 0.3s",
  },
  sectionTitle: {
    color: "#334155",
    fontSize: "17px",
    marginBottom: "16px",
  },
  task: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    marginBottom: "10px",
    background: "#f8fafc",
    border: "1px solid #eef2f7",
    borderRadius: "13px",
  },
  taskText: {
    flex: 1,
    cursor: "pointer",
    fontSize: "14px",
    overflowWrap: "anywhere",
    lineHeight: 1.5,
  },
  delete: {
    border: "none",
    background: "#fee2e2",
    borderRadius: "9px",
    padding: "9px",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    padding: "28px 10px",
    background: "#f8fafc",
    borderRadius: "16px",
    color: "#64748b",
  },
  congrats: {
    textAlign: "center",
    color: "#059669",
    fontWeight: "bold",
    marginTop: "20px",
  },
  footer: {
    textAlign: "center",
    color: "#cbd5e1",
    fontSize: "10px",
    letterSpacing: "1.5px",
    marginTop: "30px",
    marginBottom: 0,
  },
};
